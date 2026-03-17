import axios from "axios"
import type {
  Advertisement,
  AuthStatus,
  ConnectionRecord,
  DeleteResponse,
  FriendWithConnectionStatus,
  Kick,
  KickUpsertResult,
  LoginRequest,
  MessageResponse,
  PasswordChangeData,
  PasswordResetVerifyResponse,
  PostsCursorResponse,
  ProfileData,
  RegisterRequest,
  TokenResponse,
  UpdateSettingsRequest,
  UserPostComment,
  UserPostReaction,
  UserSearchResponse,
  UserSettings,
} from "./Types";
import type { PostFormSchema } from "../PostComponents/comment-according";

const baseURL = import.meta.env.VITE_API_URL;

export const JsonClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

export const FormDataClient = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});


//-------------------------------------------------------------------------------------
// #region GET
export async function authStatusRequest() {
    const response = await JsonClient.get<AuthStatus>("/api/auth/status")
    return response;
}
export async function getuserByid(id: string) {
    const response = await GetProfil(id);
    const Data = {
        user: response.data.user,
        profil: response.data,
    }
    return Data;
}
export async function GetProfil(id: string) {
    const response = await JsonClient.get<ProfileData>(`/api/profiles/${id}`);
    return response;
}
export async function getPosts({ page, perPage }: { page: number, perPage: number }) {
    const response = await JsonClient.get<PostsCursorResponse>(`/api/posts`, {
        params: {
            page,
            perPage,
        }
    })

    return response.data
}
export async function getMyreaction(POST_ID: number) {
    const response = await JsonClient.get<UserPostReaction | null>(`/api/reactions/${POST_ID}`)

    return response.data
}
export async function TokenStatusRequest(Token: string) {
    const response = await JsonClient.get<boolean>(`/api/auth/token/${Token}`);

    return response;
}
export async function GetMyconnections(Who: string) {
    const response = await JsonClient.get<FriendWithConnectionStatus[]>(`/api/connections/me/${Who}`);

    return response;
}
export async function GetSettings() {
    const response = await JsonClient.get<UserSettings>(`/api/settings`);

    return response;
}
export async function GetAds() {
    const response = await JsonClient.get<Advertisement>("/api/advertisement/random")

    return response;
}
export async function GetusersByname(params: { q: string; page: number; pageSize: number }) {
    const response = await JsonClient.get<UserSearchResponse>("/api/users/search", { params })

    return response;
}
export async function GetComents(postid: string) {
    const response = await JsonClient.get<UserPostComment[]>(`/api/comments/postComments/${postid}`);

    return response;
}
export async function GetKick() {
    const response = await JsonClient.get<Kick[]>("/api/kicks/me")

    return response
}
// #endregion

//-------------------------------------------------------------------------------------
// #region POST
export async function loginRequest(data: LoginRequest) {
    const response = await JsonClient.post<TokenResponse>("/api/auth/login", data);

    return response;
}
export async function RegisterRequest(data: RegisterRequest) {
    const response = await JsonClient.post<MessageResponse>("/api/auth/register", data);

    return response;
}
export async function RegisterConfirmRequest(data: FormData, token: string) {
    const response = await FormDataClient.post(`/api/auth/register/confirm/${token}`, data);

    return response;
}
export async function createPost(data: FormData) {
    const response = await FormDataClient.post(`/api/posts`, data);

    return response;
}
export async function makeReaction(data: { POST_ID: number; reaction: 'like' | 'dislike' }) {
    const response = await JsonClient.post(`/api/reactions`, data);
    return response;
}
export async function MakeCommentForPost(comment: PostFormSchema) {
    const response = await JsonClient.post<UserPostComment>(`/api/comments`, comment)

    return response.data
}
export async function SendOTPToPasswordReset(email: string) {
    const response = await JsonClient.post<MessageResponse>(`/api/auth/reset/send-code`, { email });

    return response;
}
export async function SendVTCR({ email, verify_code }: { verify_code: string, email: string }) {
    const response = await JsonClient.post<PasswordResetVerifyResponse>(`/api/auth/reset/verify-code`, { verify_code, email });
    return response;
}
export async function ChangePassword({ userId, password }: { userId: number, password: string }) {
    const response = await JsonClient.post<MessageResponse>(`/api/auth/reset/new_password`, { userId, password });
    return response;
}
export async function PostManager({ ConType, id }: { ConType?: string, id: number }) {
    const response = await JsonClient.post<{ user: ConnectionRecord }>(`/api/connections/${id}${ConType ? `/${ConType}` : ""}`);
    return response;
}
export async function BlockUserID({ id }: { id: number }) {
    const response = await PostManager({ id, ConType: "blocked" })
    return response;
}
export async function AddFriend({ id }: { id: number }) {
    const response = await PostManager({ id });
    return response;
}
export async function postKick(userId: number) {
    const response = await JsonClient.post<KickUpsertResult>(`/api/kicks/${userId}`);
    return response;
}
// #endregion




//-------------------------------------------------------------------------------------
// #region PUT


// #endregion




//-------------------------------------------------------------------------------------
// #region PATCH
export async function UpdateProfile(data: FormData, id: number) {
    const response = await FormDataClient.patch(`/api/profiles/${id}`, data);

    return response;
}
export async function connectionMangager({ ConType, id }: { ConType?: string, id: number }) {
    const response = await JsonClient.patch<{ user: ConnectionRecord }>(`/api/connections/${id}${ConType ? `/${ConType}` : ""}`);

    return response;
}
export async function SaveSettings(Settings: UpdateSettingsRequest) {
    const response = await JsonClient.patch<UserSettings>(`/api/settings`, { ...Settings });

    return response;
}
export async function PasswordChange(data: PasswordChangeData) {
    const response = await JsonClient.patch<MessageResponse>(`/api/users/password/change`, { data });

    return response;
}
export async function PostUpdate(id: number, data: FormData) {
    const response = await FormDataClient.patch(`/api/posts/${id}`, data);

    return response;
}

// #endregion




//-------------------------------------------------------------------------------------
// #region DELETE
export async function logoutRequest() {
    const response = await JsonClient.delete<MessageResponse>("/api/auth/logout");

    return response;
}
export async function deletConnectionReqest({ id }: { id: number }) {
    const response = await JsonClient.delete<DeleteResponse>(`/api/connections/${id}`);

    return response;
}
export async function deletpost({ id }: { id: number }) {
    const response = await JsonClient.delete<DeleteResponse>(`/api/posts/${id}`);

    return response;
}
export async function deletcomment({ id }: { id: string }) {
    const response = await JsonClient.delete<DeleteResponse>(`/api/comments/${id}`);

    return response;
}
// #endregion



