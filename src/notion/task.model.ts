class Task {
  constructor(
    readonly title: string,
    readonly responsibilities?: string[],
    readonly start?: string,
    readonly end?: string,
    readonly description?: string,
    readonly relationId?: string,
  ) {}
}
export { Task };
