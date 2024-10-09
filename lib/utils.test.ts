import { getLocaleFromCookie } from "./utils";

describe('getLocaleFromCookie', () => {
    it('should return the correct language from the lang cookie', () => {
        const cookies = "theme=dark; lang=en; sessionId=12345";
        expect(getLocaleFromCookie(cookies)).toBe("en");
    });

    it('should default to "ar" when the lang cookie is not present', () => {
        const cookies = "theme=dark; sessionId=12345";
        expect(getLocaleFromCookie(cookies)).toBe("ar");
    });

    it('should default to "ar" when cookies string is empty', () => {
        const cookies = "";
        expect(getLocaleFromCookie(cookies)).toBe("ar");
    });

    it('should handle multiple cookies and extract the lang cookie', () => {
        const cookies = "sessionId=12345; theme=dark; lang=fr";
        expect(getLocaleFromCookie(cookies)).toBe("fr");
    });

    it('should return default "ar" if lang cookie is malformed', () => {
        const cookies = "sessionId=12345; theme=dark; lang";
        expect(getLocaleFromCookie(cookies)).toBe("ar");
    });
});
