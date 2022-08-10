enum ERROR_CODES {
  WRONG_METHOD = "A HTTP kérés metódusa minden esetben POST-nak kell lennie.",
  MISSING_CREDENTIALS = "A kérés bodyjának tartalmaznia kell a felhasználónevet és a jelszót.",
  INVALID_CREDENTIALS = "Hibás felhasználónév vagy jelszó.",
  UNAUTHORIZED = "Ehhez a forráshoz nincs jogosultságod!",
  MISSING_ARGUMENTS = "A kérésből hiányzik egy vagy több argumentum.",
}

export default ERROR_CODES;
