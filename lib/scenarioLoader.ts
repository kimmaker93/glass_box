import { Scenario, ScenarioStep } from '@/types/scenario'

/**
 * 시나리오 검증 에러
 */
export class ScenarioValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ScenarioValidationError'
  }
}

/**
 * 시나리오 구조를 검증합니다.
 *
 * @param data - 검증할 시나리오 데이터
 * @throws {ScenarioValidationError} 검증 실패 시
 */
export function validateScenario(data: unknown): asserts data is Scenario {
  if (!data || typeof data !== 'object') {
    throw new ScenarioValidationError('시나리오 데이터가 유효하지 않습니다.')
  }

  const scenario = data as Partial<Scenario>

  // 필수 필드 검증
  if (!scenario.id || typeof scenario.id !== 'string') {
    throw new ScenarioValidationError('시나리오 ID가 누락되었거나 유효하지 않습니다.')
  }

  if (!scenario.name || typeof scenario.name !== 'string') {
    throw new ScenarioValidationError('시나리오 이름이 누락되었거나 유효하지 않습니다.')
  }

  if (!scenario.description || typeof scenario.description !== 'string') {
    throw new ScenarioValidationError('시나리오 설명이 누락되었거나 유효하지 않습니다.')
  }

  if (!Array.isArray(scenario.steps)) {
    throw new ScenarioValidationError('시나리오 단계가 배열이 아닙니다.')
  }

  if (!scenario.createdAt || typeof scenario.createdAt !== 'string') {
    throw new ScenarioValidationError('시나리오 생성일이 누락되었거나 유효하지 않습니다.')
  }

  // 단계 검증
  scenario.steps.forEach((step, index) => {
    validateStep(step, index)
  })
}

/**
 * 시나리오 단계를 검증합니다.
 *
 * @param step - 검증할 단계
 * @param index - 단계 인덱스 (에러 메시지용)
 * @throws {ScenarioValidationError} 검증 실패 시
 */
function validateStep(step: unknown, index: number): asserts step is ScenarioStep {
  if (!step || typeof step !== 'object') {
    throw new ScenarioValidationError(`단계 ${index + 1}의 데이터가 유효하지 않습니다.`)
  }

  const s = step as Partial<ScenarioStep>

  if (!s.id || typeof s.id !== 'string') {
    throw new ScenarioValidationError(`단계 ${index + 1}의 ID가 누락되었거나 유효하지 않습니다.`)
  }

  if (typeof s.order !== 'number') {
    throw new ScenarioValidationError(
      `단계 ${index + 1}의 순서(order)가 누락되었거나 유효하지 않습니다.`
    )
  }

  const validTypes = [
    'user_input',
    'ai_thinking',
    'ai_planning',
    'ai_searching',
    'ai_response',
    'tool_call',
    'memory_update',
  ]
  if (!s.type || !validTypes.includes(s.type)) {
    throw new ScenarioValidationError(
      `단계 ${index + 1}의 타입이 유효하지 않습니다. (${s.type})`
    )
  }

  if (typeof s.delay !== 'number' || s.delay < 0) {
    throw new ScenarioValidationError(
      `단계 ${index + 1}의 delay가 유효하지 않습니다. (${s.delay})`
    )
  }

  if (!s.data || typeof s.data !== 'object') {
    throw new ScenarioValidationError(`단계 ${index + 1}의 data가 누락되었거나 유효하지 않습니다.`)
  }
}

/**
 * JSON 문자열에서 시나리오를 로드합니다.
 *
 * @param jsonString - JSON 문자열
 * @returns 파싱 및 검증된 시나리오
 * @throws {ScenarioValidationError} 파싱 또는 검증 실패 시
 */
export function loadScenarioFromJSON(jsonString: string): Scenario {
  try {
    const data = JSON.parse(jsonString)
    validateScenario(data)
    return data
  } catch (error) {
    if (error instanceof ScenarioValidationError) {
      throw error
    }
    if (error instanceof SyntaxError) {
      throw new ScenarioValidationError(`JSON 파싱 오류: ${error.message}`)
    }
    throw new ScenarioValidationError(`시나리오 로드 실패: ${error}`)
  }
}

/**
 * 파일에서 시나리오를 로드합니다. (클라이언트 사이드)
 *
 * @param file - 업로드된 파일 객체
 * @returns 파싱 및 검증된 시나리오
 */
export async function loadScenarioFromFile(file: File): Promise<Scenario> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        const scenario = loadScenarioFromJSON(content)
        resolve(scenario)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new ScenarioValidationError('파일 읽기 실패'))
    }

    reader.readAsText(file)
  })
}

/**
 * 시나리오를 JSON 문자열로 변환합니다.
 *
 * @param scenario - 변환할 시나리오
 * @param pretty - 들여쓰기 여부 (기본값: true)
 * @returns JSON 문자열
 */
export function scenarioToJSON(scenario: Scenario, pretty = true): string {
  return JSON.stringify(scenario, null, pretty ? 2 : 0)
}

/**
 * 시나리오를 JSON 파일로 다운로드합니다. (클라이언트 사이드)
 *
 * @param scenario - 다운로드할 시나리오
 * @param filename - 파일명 (기본값: 시나리오 ID.json)
 */
export function downloadScenarioAsJSON(scenario: Scenario, filename?: string): void {
  const json = scenarioToJSON(scenario)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename || `${scenario.id}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * 시나리오 샘플 템플릿을 생성합니다.
 *
 * @param name - 시나리오 이름
 * @param description - 시나리오 설명
 * @returns 기본 구조를 가진 시나리오
 */
export function createScenarioTemplate(name: string, description: string): Scenario {
  return {
    id: `scenario-${Date.now()}`,
    name,
    description,
    steps: [],
    createdAt: new Date().toISOString(),
    metadata: {
      author: 'User',
      tags: [],
      difficulty: 'easy',
    },
  }
}
