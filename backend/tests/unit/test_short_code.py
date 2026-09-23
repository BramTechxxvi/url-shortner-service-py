from app.utils.short_code import generate_short_code


def test_generate_short_code_returns_six_characters_at_default():
    short_code = generate_short_code()
    assert len(short_code) == 6
    
    
    
def test_generate_short_code_contains_only_base62_characters():
    short_code = generate_short_code()
    assert short_code.isalnum()
    
    

def test_generate_code_accepts_custom_length():
    short_code = generate_short_code(length=12)
    assert len(short_code) == 12