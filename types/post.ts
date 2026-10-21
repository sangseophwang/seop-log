export interface PostData {
  title: string;
  description: string;
  date: string;
  // true면 배포 빌드에서 제외한다 (개발 서버에서만 보임)
  draft?: boolean;
  id?: string;
  category?: string;
}
