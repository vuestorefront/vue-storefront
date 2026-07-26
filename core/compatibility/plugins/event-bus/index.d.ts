interface EventBusFacade {
  $dataFilters: Record<string, ((payload: any) => any)[]>
  $on (eventName: string | string[], callback: (...args: any[]) => any): this
  $once (eventName: string, callback: (...args: any[]) => any): this
  $off (eventName?: string | string[], callback?: (...args: any[]) => any): this
  $emit (eventName: string, ...args: any[]): this
  $filter (eventName: string, callback: (payload: any) => any): void
  $emitFilter (eventName: string, ...args: any[]): Promise<any[]>
}

declare const EventBus: EventBusFacade

export default EventBus
