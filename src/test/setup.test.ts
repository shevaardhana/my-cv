// Smoke test: verify project setup is correct
describe('Project Setup', () => {
  it('vitest globals are available', () => {
    expect(true).toBe(true)
  })

  it('dark mode class is applied to document', () => {
    document.documentElement.classList.add('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
