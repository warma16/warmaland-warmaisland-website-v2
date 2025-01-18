import requests
base_url ="https://www.17xueba.com/m/study/lesson/day/list.vpage"
r=requests.post(base_url,headers={
    "Referer":"https://www.17xueba.com/views/w/study_center/schedule.vpage",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62",
    "Cookie":"17x_s_guard_dog=eb93ad3948304f9092efebb0b67d51f6; 17x_s_uid=20157886; 17x_s_sign=991fdc3a3e622e293057694d5a1f5b15fc2a90b2.1628038886080; 17x_pversion=20201117; 17x_s_grade=9; 17x_20157886_601441=true"
    },data={
        "day":"20210804",
        "containPeiuCourse":"true"
    })
print(r.text)