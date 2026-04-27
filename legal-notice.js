(() => {
  const NOTICE_ID = 'bac-legal-notice';
  const POLICY_URL = '/BACapp/PRIVACY.md';

  function addLegalNoticeStyles() {
    if (document.getElementById('legal-notice-styles')) return;
    const style = document.createElement('style');
    style.id = 'legal-notice-styles';
    style.textContent = `
      #${NOTICE_ID}{
        position:fixed;
        left:calc(var(--sbw,252px) + 16px);
        right:16px;
        bottom:14px;
        z-index:9998;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
        padding:10px 12px;
        border:1px solid var(--line2,rgba(255,255,255,.12));
        border-radius:14px;
        background:rgba(6,9,15,.92);
        color:var(--txt2,#7a84a0);
        font-size:.74rem;
        line-height:1.5;
        box-shadow:0 14px 42px rgba(0,0,0,.38);
        backdrop-filter:blur(18px);
      }
      #${NOTICE_ID} strong{color:var(--gold,#e4a84c)}
      #${NOTICE_ID} a{color:var(--teal,#3ccfbe);text-decoration:none;font-weight:800}
      #${NOTICE_ID} a:hover{text-decoration:underline}
      #${NOTICE_ID} button{
        min-width:32px;
        min-height:32px;
        border-radius:10px;
        border:1px solid var(--line,rgba(255,255,255,.08));
        background:rgba(255,255,255,.04);
        color:var(--txt,#e0e4f0);
        cursor:pointer;
        font-weight:900;
      }
      @media(max-width:768px){
        #${NOTICE_ID}{left:12px;right:12px;bottom:66px;align-items:flex-start;font-size:.72rem}
      }
    `;
    document.head.appendChild(style);
  }

  function addLegalNotice() {
    if (document.getElementById(NOTICE_ID)) return;
    if (localStorage.getItem('bac-legal-notice-dismissed') === 'yes') return;

    addLegalNoticeStyles();
    const notice = document.createElement('aside');
    notice.id = NOTICE_ID;
    notice.setAttribute('role', 'note');
    notice.setAttribute('aria-label', 'Mențiune simulator și confidențialitate');
    notice.innerHTML = `
      <div>
        <strong>Mențiune:</strong> BAC Space este doar un simulator educațional pentru pregătire. Nu este platformă oficială și nu garantează rezultatul la examen. Datele de progres sunt salvate local în browser. <a href="${POLICY_URL}" target="_blank" rel="noopener">Politica de confidențialitate</a>
      </div>
      <button type="button" aria-label="Închide mențiunea">×</button>
    `;

    notice.querySelector('button').addEventListener('click', () => {
      localStorage.setItem('bac-legal-notice-dismissed', 'yes');
      notice.remove();
    });

    document.body.appendChild(notice);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addLegalNotice);
  else addLegalNotice();
})();
