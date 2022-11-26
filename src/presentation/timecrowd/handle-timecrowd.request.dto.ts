type HandleTimeCrowdRequestDto = {
  id: string;
  started_at: string; // yyyy-MM-dd:Thh:mm:ss
  stopped_at: string; // yyyy-MM-dd:Thh:mm:ss
  duration: number; // 作業時間
  amount: number;
  user: {
    id: string;
    nickname: string;
  };
  task: {
    id: string;
    created_at: string; // yyyy-MM-dd:Thh:mm:ss
    updated_at: string; // yyyy-MM-dd:Thh:mm:ss
    title: string;
    url: string;
    parent_id: string;
    category: {
      id: string;
      key: string;
      title: string;
      url: string;
      team_id: number;
      created_at: string;
      updated_at: string;
      description: string;
    };
  };
  team: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
  event: 'entry_start' | 'entry_stop';
};

export default HandleTimeCrowdRequestDto;
