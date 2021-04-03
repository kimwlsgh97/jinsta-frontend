export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("token")) || false,
};
//Boolean은 ()안에 null이면 false를, null이 아니면 true를 반환하는 함수

export const resolvers = {
  Mutation: {
    logUserIn: async (_, { token }, { cache }) => {
      await localStorage.setItem("token", token);
      cache.writeData({
        data: {
          isLoggedIn: true,
        },
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token");
      window.location = "/";
      return null;
    },
  },
};
