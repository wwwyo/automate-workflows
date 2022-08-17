type TaskType = {
  readonly title: string;
  readonly responsibilities?: string[];
  readonly start?: string;
  readonly end?: string;
  readonly description?: string;
  readonly relationId?: string;
};
class Task implements TaskType {
  readonly title: string;
  readonly responsibilities?: string[];
  readonly start?: string;
  readonly end?: string;
  readonly description?: string;
  readonly relationId?: string;
  constructor({
    title,
    responsibilities,
    start,
    end,
    description,
    relationId,
  }: TaskType) {
    this.title = title;
    this.responsibilities = responsibilities;
    this.start = start;
    this.end = end;
    this.description = description;
    this.relationId = relationId;
  }

  static parse(values): TaskType {
    const valArray = values.map((valWrapper) => {
      return Object.values(valWrapper)[0];
    });

    return {
      title: valArray[0]['value'],
      responsibilities: valArray[1]['selected_users'],
      start: valArray[2]['selected_date'],
      end: valArray[3]['selected_date'],
      description: valArray[4]['value'],
    };
  }

  get toString() {
    return `${this.title}\n${this.start ?? ''} 〜 ${this.end ?? ''}\n${
      this.description ?? ''
    }`;
  }
}
export { Task };
