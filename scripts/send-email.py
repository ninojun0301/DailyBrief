#!/usr/bin/env python3
"""Email the generated Daily Brief through QQ Mail SMTP."""

import os
import smtplib
import ssl
from datetime import datetime
from email.message import EmailMessage
from email.utils import formatdate
from pathlib import Path
from zoneinfo import ZoneInfo


def required_env(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise RuntimeError(f"{name} is required")
    return value


recipient = required_env("EMAIL_TO")
sender = required_env("EMAIL_FROM")
password = required_env("EMAIL_PASSWORD")
report_tz = os.environ.get("REPORT_TZ", "Asia/Shanghai")

report_date = datetime.now(ZoneInfo(report_tz)).strftime("%Y-%m-%d")
report_path = Path("daily_reports") / report_date / f"{report_date}.html"
if not report_path.exists():
    raise FileNotFoundError(f"Daily report not found: {report_path}")

html = report_path.read_text(encoding="utf-8")

message = EmailMessage()
message["Subject"] = f"每日简报 {report_date}｜A股 · 黄金 · 加密货币"
message["From"] = sender
message["To"] = recipient
message["Date"] = formatdate(localtime=True)
message.set_content(
    f"{report_date} 的 DailyBrief 已生成。\n\n"
    "邮件正文包含完整 HTML 日报；如客户端未正常显示，请使用支持 HTML 的邮箱客户端查看。"
)
message.add_alternative(html, subtype="html")

context = ssl.create_default_context()
with smtplib.SMTP_SSL("smtp.qq.com", 465, context=context, timeout=30) as smtp:
    smtp.login(sender, password)
    smtp.send_message(message, from_addr=sender, to_addrs=[recipient])

print(f"Emailed Daily Brief {report_date} to {recipient}")
