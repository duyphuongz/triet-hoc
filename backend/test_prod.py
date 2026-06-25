import urllib.request, json

data = json.dumps({
    'email': 'prodtest4@test.com',
    'password': 'password123',
    'name': 'ProdTest'
}).encode('utf-8')

req = urllib.request.Request(
    'https://monkfish-app-plu6w.ondigitalocean.app/api/auth/register',
    data=data,
    headers={'Content-Type': 'application/json'}
)

try:
    response = urllib.request.urlopen(req)
    print(response.read().decode())
except Exception as e:
    print(e.read().decode())
