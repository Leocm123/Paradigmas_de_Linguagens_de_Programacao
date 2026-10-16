# Aula 12 - Exercício 3: laço reescrito como compreensão de lista
# Online: https://onecompiler.com/python  (cole o código inteiro)
# Local:  python exercicio3.py
precos = [50.0, 120.0, 80.0, 200.0]

com_desconto = [p * 0.9 if p > 100 else p for p in precos]

print(com_desconto)  # [50.0, 108.0, 80.0, 180.0]
