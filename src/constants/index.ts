export const PATH = {
  TIMELINE: "/timeline",
  PROFILE: "/profile",
  POST: "/post",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  getProfilePath: (id: string | undefined) => `${PATH.PROFILE}/${id}`,
  getPostPath: (id: string) => `${PATH.POST}/${id}`,
};
