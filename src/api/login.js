import request from "@/utils/request";
export const login = (data) => {
  return request({
    url: "/sys/login",
    method: "post",
    data,
  });
};

//获取个人信息
export const getUserInfo = () => {
  return request({
    url: "/sys/profile",
    method: "post",
  });
};
