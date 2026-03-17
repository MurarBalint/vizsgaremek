export type UserRole = "user" | "admin" | "owner";
export type ReactionType = "like" | "dislike";
export type MyReactionType = ReactionType | "none";
export type ConnectionStatus = "pending" | "accepted" | "blocked";
export type DerivedConnectionStatus =
  | "accepted"
  | "waiting"
  | "to_respond"
  | "blocked_by_me"
  | "blocked_me";

export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
  isOperational?: boolean;
  details?: unknown;
  data?: unknown;
}

export interface MessageResponse {
  message: string;
}

export interface DeleteResponse {
  success: boolean;
  deleted: number;
}

export interface AuthStatus {
  userID: number;
  username: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface TokenResponse {
  token: string;
}

export interface BaseUser {
  ID: number;
  email: string;
  username: string;
  role: UserRole;
  created_at: string;
}

export interface UserWithAuthState extends BaseUser {
  is_loggedIn: boolean;
  updated_at: string;
  last_login: string | null;
}

export interface UserProfile {
  ID: number;
  USER_ID: number;
  level: number;
  XP: number;
  first_name: string;
  last_name: string;
  birth_date: string | null;
  birth_place: string;
  schools: string;
  bio: string;
  avatar_url: string;
}

export interface UserWithProfile extends BaseUser {
  profile?: UserProfile;
}

export interface UserPostComment {
  ID: number;
  USER_ID: number;
  POST_ID: number;
  comment: string;
  created_at: string | null;
  updated_at: string | null;
  user?: UserWithProfile;
}

export interface UserPostReaction {
  ID: number;
  USER_ID: number;
  POST_ID: number;
  reaction: ReactionType;
  created_at: string | null;
  updated_at: string | null;
}

export interface UserPost {
  ID: number;
  USER_ID: number;
  like: number;
  dislike: number;
  visibility: boolean;
  title: string;
  content: string;
  media_url: string;
  created_at: string;
  updated_at: string;
  user?: UserWithProfile;
  comments?: UserPostComment[];
}

export interface FeedPost extends UserPost {
  myReaction: MyReactionType;
  likeCount: number;
  dislikeCount: number;
}

export interface PostsCursorResponse {
  data: FeedPost[];
  nextCursor: number | null;
}

export interface ProfileData extends UserProfile {
  user: UserWithProfile & {
    posts: UserPost[];
  };
  friendCount: number;
}

export interface ConnectionRecord {
  ID: number;
  User_Requested_ID: number;
  To_User_ID: number;
  Status: ConnectionStatus;
}

export interface ConnectionSummary {
  UserID: number;
  Requested_BY?: number | null;
  Status: ConnectionStatus;
}

export interface FriendWithConnectionStatus extends UserWithProfile {
  connection_status: DerivedConnectionStatus;
}

export interface CreateConnectionResponse {
  user: ConnectionRecord;
}

export interface NotificationSettings {
  new_post: boolean;
  new_comment_on_post: boolean;
  new_reaction_on_post: boolean;
  new_login: boolean;
  new_friend_request: boolean;
}

export interface UserSettings {
  ID: number;
  Notifications: NotificationSettings;
  DataPrivacy: boolean;
}

export interface UpdateSettingsRequest {
  Notifications?: Partial<NotificationSettings>;
  DataPrivacy?: boolean;
}

export interface Advertisement {
  ID: number;
  title: string | null;
  subject: string | null;
  imagePath: string;
  created_at: string;
}

export interface Kick {
  ID: number;
  FROM_USER_ID: number;
  TO_USER_ID: number;
  created_at: string;
  updated_at: string;
}

export type KickUpsertResult = Kick | { updated: true };

export interface UserSearchItem {
  ID: number;
  username: string;
  email: string;
  created_at: string;
  profile?: UserProfile;
}

export interface UserSearchResponse {
  items: UserSearchItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface LoginRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export interface ConfirmRegistrationResponse {
  message: string;
  user: UserWithAuthState;
  profile: UserProfile;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  media?: File | null;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  media?: File | null;
  mediaDeleted?: boolean;
}

export interface CreateCommentRequest {
  POST_ID: number;
  comment: string;
}

export interface PasswordChangeData {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface PasswordChangeRequest {
  data: PasswordChangeData;
}

export interface PasswordResetVerifyAccount {
  ID: number;
  email: string;
  username: string;
  avatar_url: string;
}

export type PasswordResetVerifyResponse = PasswordResetVerifyAccount[];

export interface PasswordResetNewPasswordRequest {
  userId: number;
  password: string;
}

export interface CloudUploadResponse {
  success: boolean;
  message: string;
  file: string;
  path: string;
}
