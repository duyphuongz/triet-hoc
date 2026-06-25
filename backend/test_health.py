import urllib.request
try:
    print(urllib.request.urlopen('https://monkfish-app-plu6w.ondigitalocean.app/api/health').read().decode())
except Exception as e:
    print(e.read().decode() if hasattr(e, 'read') else str(e))
