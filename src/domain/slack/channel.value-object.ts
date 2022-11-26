type ChannelType = {
  ERROR: string;
  分報_渡部: string;
  All_ATTENDANCE: string;
};

type ChannelLabel = keyof ChannelType;

export default class Channel {
  private readonly CHANNEL_TYPE: ChannelType;
  readonly label: ChannelLabel;
  readonly id: string;

  constructor(label: ChannelLabel) {
    this.CHANNEL_TYPE = {
      ERROR: process.env.SLACK_CHANNEL_ERROR,
      分報_渡部: process.env.SLACK_CHANNEL_TIMES_WATANABE,
      All_ATTENDANCE: process.env.SLACK_CHANNEL_ALL_ATTENDANCE,
    } as const;
    this.label = label;
    this.id = this.CHANNEL_TYPE[label];
  }

  get error() {
    return this.CHANNEL_TYPE['ERROR'];
  }
}
