import { useState, useCallback, useRef, useEffect } from 'react'
import {
  Scenario,
  ScenarioStep,
  ScenarioExecutionState,
  UserInputData,
  AIThinkingData,
  AIPlanningData,
  AISearchingData,
  AIResponseData,
  ToolCallData,
  MemoryUpdateData,
} from '@/types/scenario'
import { useSessionStore } from '@/stores/useSessionStore'
import { useMessageStore } from '@/stores/useMessageStore'
import { useMemoryStore } from '@/stores/useMemoryStore'

/**
 * 시나리오 실행 엔진 Hook
 *
 * @description
 * 시나리오를 단계별로 실행하는 React Hook입니다.
 * 각 단계의 타입에 따라 적절한 Store 액션을 호출하고,
 * delay를 고려하여 순차적으로 실행합니다.
 *
 * @example
 * ```tsx
 * const { start, pause, resume, stop, state } = useScenarioRunner()
 *
 * // 시나리오 실행
 * start(scenario)
 *
 * // 일시정지
 * pause()
 *
 * // 재개
 * resume()
 *
 * // 정지
 * stop()
 * ```
 */
export function useScenarioRunner() {
  const [state, setState] = useState<ScenarioExecutionState>({
    scenarioId: null,
    currentStepIndex: 0,
    status: 'idle',
    idMapping: {},
  })

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const scenarioRef = useRef<Scenario | null>(null)

  // Store hooks
  const sessionStore = useSessionStore()
  const messageStore = useMessageStore()
  const memoryStore = useMemoryStore()

  /**
   * 현재 실행 중인 타임아웃을 취소합니다.
   */
  const clearCurrentTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  /**
   * 단계를 실행합니다.
   */
  const executeStep = useCallback(
    async (step: ScenarioStep, sessionId: string): Promise<void> => {
      try {
        const data = step.data

        switch (data.type) {
          case 'user_input': {
            const typedData = data as UserInputData
            const messageId = messageStore.addMessage(sessionId, 'user', typedData.content)
            setState((prev) => ({
              ...prev,
              idMapping: { ...prev.idMapping, [step.id]: messageId },
            }))
            break
          }

          case 'ai_thinking': {
            const typedData = data as AIThinkingData
            // ThinkingStep은 메시지에 추가될 수 있음
            // 여기서는 구조만 구현 - 실제 UI 연동은 Phase P6에서
            console.log('AI Thinking:', typedData.steps)
            break
          }

          case 'ai_planning': {
            const typedData = data as AIPlanningData
            // Plan 생성 로직
            // 실제 구현은 Phase P6에서 메시지와 연결
            console.log('AI Planning:', typedData.title, typedData.steps)
            break
          }

          case 'ai_searching': {
            const typedData = data as AISearchingData
            // 검색 결과를 메모리로 저장
            typedData.results.forEach((result) => {
              const memoryId = memoryStore.addMemory(
                'web',
                result.title,
                result.summary,
                {
                  sessionId,
                  source: result.source,
                  tags: [typedData.query],
                }
              )
              setState((prev) => ({
                ...prev,
                idMapping: { ...prev.idMapping, [result.id]: memoryId },
              }))
            })
            break
          }

          case 'ai_response': {
            const typedData = data as AIResponseData
            const messageId = messageStore.addMessage(sessionId, 'assistant', typedData.content)
            setState((prev) => ({
              ...prev,
              idMapping: { ...prev.idMapping, [step.id]: messageId },
            }))
            break
          }

          case 'tool_call': {
            const typedData = data as ToolCallData
            // 도구 호출 로직 - 실제 구현은 Phase P6에서
            console.log('Tool Call:', typedData.toolName, typedData.arguments)
            break
          }

          case 'memory_update': {
            const typedData = data as MemoryUpdateData
            const memoryId = memoryStore.addMemory(
              typedData.memoryType,
              typedData.title,
              typedData.content,
              {
                sessionId,
                tags: typedData.tags,
              }
            )
            setState((prev) => ({
              ...prev,
              idMapping: { ...prev.idMapping, [step.id]: memoryId },
            }))
            break
          }

          default:
            console.warn('Unknown step type:', (data as any).type)
        }
      } catch (error) {
        console.error('Error executing step:', error)
        throw error
      }
    },
    [messageStore, memoryStore]
  )

  /**
   * 다음 단계를 실행합니다.
   */
  const executeNextStep = useCallback(
    async (scenario: Scenario, stepIndex: number, sessionId: string) => {
      if (stepIndex >= scenario.steps.length) {
        // 모든 단계 완료
        setState((prev) => ({
          ...prev,
          status: 'completed',
          currentStepIndex: stepIndex,
        }))
        return
      }

      const step = scenario.steps[stepIndex]

      setState((prev) => ({
        ...prev,
        currentStepIndex: stepIndex,
        status: 'running',
      }))

      try {
        // 현재 단계 실행
        await executeStep(step, sessionId)

        // delay 후 다음 단계 실행
        timeoutRef.current = setTimeout(() => {
          executeNextStep(scenario, stepIndex + 1, sessionId)
        }, step.delay)
      } catch (error) {
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: {
            step: stepIndex,
            message: error instanceof Error ? error.message : 'Unknown error',
          },
        }))
      }
    },
    [executeStep]
  )

  /**
   * 시나리오 실행을 시작합니다.
   */
  const start = useCallback(
    (scenario: Scenario, workspaceId?: string) => {
      clearCurrentTimeout()

      // 워크스페이스가 없으면 생성
      const targetWorkspaceId =
        workspaceId || sessionStore.createWorkspace(`시나리오: ${scenario.name}`)

      // 세션 생성
      const sessionId = sessionStore.createSession(targetWorkspaceId, scenario.name)

      // 상태 초기화 및 실행 시작
      setState({
        scenarioId: scenario.id,
        currentStepIndex: 0,
        status: 'running',
        idMapping: {},
      })

      scenarioRef.current = scenario
      executeNextStep(scenario, 0, sessionId)
    },
    [clearCurrentTimeout, sessionStore, executeNextStep]
  )

  /**
   * 시나리오 실행을 일시정지합니다.
   */
  const pause = useCallback(() => {
    clearCurrentTimeout()
    setState((prev) => ({ ...prev, status: 'paused' }))
  }, [clearCurrentTimeout])

  /**
   * 일시정지된 시나리오를 재개합니다.
   */
  const resume = useCallback(() => {
    if (state.status !== 'paused' || !scenarioRef.current) {
      console.warn('Cannot resume: scenario is not paused')
      return
    }

    const scenario = scenarioRef.current
    const activeSession = sessionStore.sessions.find(
      (s) => s.workspaceId && sessionStore.workspaces.some((w) => w.id === s.workspaceId)
    )

    if (!activeSession) {
      console.error('No active session found')
      return
    }

    executeNextStep(scenario, state.currentStepIndex, activeSession.id)
  }, [state, sessionStore, executeNextStep])

  /**
   * 시나리오 실행을 정지합니다.
   */
  const stop = useCallback(() => {
    clearCurrentTimeout()
    setState({
      scenarioId: null,
      currentStepIndex: 0,
      status: 'idle',
      idMapping: {},
    })
    scenarioRef.current = null
  }, [clearCurrentTimeout])

  /**
   * 컴포넌트 언마운트 시 타임아웃 정리
   */
  useEffect(() => {
    return () => {
      clearCurrentTimeout()
    }
  }, [clearCurrentTimeout])

  return {
    state,
    start,
    pause,
    resume,
    stop,
  }
}
