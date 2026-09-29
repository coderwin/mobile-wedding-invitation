/**
 * 카카오톡 인앱 브라우저나 구형 웹뷰에서는 navigator.clipboard 가 막혀 있는
 * 경우가 있어서, 실패하면 숨긴 textarea + execCommand 로 한 번 더 시도합니다.
 */
export async function copyText(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // 아래 폴백으로 넘어갑니다.
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}
