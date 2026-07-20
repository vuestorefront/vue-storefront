import Vue, { PluginObject } from 'vue'

interface FilterEventBus extends Vue {
  $emitFilter (eventName: string, ...args: any[]): Promise<any[]>
  $filter (eventName: string, callback: (...args: any[]) => any): void
}

declare const EventBus: FilterEventBus
declare const EventBusPlugin: PluginObject<never>

export { EventBus as default, EventBusPlugin }
