# 배포 구성

운영 대상은 기존 메인 사이트와 분리된 신규 서버입니다.

```text
Domain: tool.onedaytrading.net
Server: 104.64.142.223
App port: 127.0.0.1:3200
Release root: /opt/onedaytools/releases
Current release: /opt/onedaytools/current
Service: onedaytools.service
Nginx config: /etc/nginx/sites-available/tool.onedaytrading.net
```

TLS 인증서는 HTTP 구성이 활성화되고 DNS가 전파된 뒤 Certbot Nginx 플러그인으로 발급합니다. 이후 일반 앱 배포에서는 Nginx 파일을 다시 복사하지 않아 Certbot이 추가한 HTTPS 구성을 보존합니다.

SSH는 `deploy/ssh/60-onedaytools-security.conf` 정책에 따라 공개키 인증만 허용합니다. Linode 콘솔의 로컬 root 비밀번호 로그인에는 영향을 주지 않습니다.

## DNS

`tool.onedaytrading.net`의 A 레코드만 `104.64.142.223`으로 지정합니다. 루트 도메인과 `www` 레코드는 변경하지 않습니다.

## 배포 순서

1. 새 릴리스 디렉터리에 소스를 업로드합니다.
2. `npm ci`, `npm run build`를 실행합니다.
3. `/opt/onedaytools/current` 심볼릭 링크를 새 릴리스로 교체합니다.
4. `systemctl restart onedaytools`로 앱만 재시작합니다.
5. 내부 포트, Nginx 호스트 헤더, 외부 HTTPS를 순서대로 점검합니다.

이 구조에서는 이전 릴리스로 `current` 링크를 되돌린 후 서비스를 재시작해 롤백할 수 있습니다.
