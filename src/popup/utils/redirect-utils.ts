export function hasInfiniteLoop(origin: string, destination: string, keepSubpath: boolean) {
  return keepSubpath && destination.includes(origin)
}
