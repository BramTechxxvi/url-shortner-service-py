import string
import secrets


CHARACTERS = string.ascii_letters + string.digits


def generate_short_code(lenght: int=6)-> str:
    return "".join(
        
        secrets.choice(CHARACTERS)
        for _ in range(6)
    )
    