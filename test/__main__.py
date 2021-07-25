string = "MichaelIyke"
def encrypt(tokens):
    stk = ""
    for token in tokens:
        stk += chr(ord(token) ^ 2)
    return stk

print("Encrypted:", encrypt("MichaelIyke"))

def decrypt(tokens):
    stk = ""
    for token in tokens:
        stk += chr(ord(token) ^ 2)
    return stk

print("Decrypted:", decrypt(encrypt("MichaelIyke")))
