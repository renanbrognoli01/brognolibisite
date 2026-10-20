# BROGNOLI visual redesign

Direction: The sentence is the layout, seed 2120161987. Brand palette and Geist retained; no redraws. BROGNOLI's maker becomes the image inside the opening sentence, then the actual Studio becomes the evidence.

Inventory: Renan Brognoli; BROGNOLI monogram; Windows Studio; DAX Creator; Documentation Creator; model relationship columns; Performance Analyzer; Microsoft credentials; Portuguese/English content; Excel/Power BI pocket guides; Calmia.

Argument and copy deck:
- Power BI. Feito por Renan. / Power BI. Built by Renan. A named maker with real portrait and a direct Studio action.
- Seu modelo, por dentro. / Inside your data model. Actual product screenshots; visitors select four tools.
- Da prática para a ferramenta. / From practice to product. Existing career information, portrait and certificates; link to full biography.
- Para ter à mão. / Keep these close. Guides, articles, videos, materials and products remain reachable with explicit descriptions.
- Vamos falar de dados? / Let's talk about data. Existing contact route.

Live element: working Studio screenshot selector with accessible pressed state. First screenshot and caption remain usable without JavaScript.

Only existing first-party imagery is used. No stock photos, generated product shots, invented clients, quotations or numbers. No sample business content introduced. No footage is included because no first-party product clip is available in the repository.

ROUND 1
Seen in one second: identifiable maker and Power BI, with a direct Studio action.
Idea (one sentence): Renan's portrait replaces a word-sized block inside his own introduction.
Live thing: four real Studio tools selectable on the page.
Layout words by section: hero=sentence / work=interface / about=portrait / resources=list / contact=invitation
Scores: design 6 · usability 6 · creativity 7 · content 8 → overall 6.4
Caps applied: inspection failures; development captures are not final validation.
Top three problems:
1. Hidden explorer figures leaked their absolute-positioned images into the page; explicit hidden figure display fixes the overlap (desktop-page-01, mobile-page-01).
2. Only one large software screenshot visible; two supporting real product screenshots added.
3. Caption directly before biography looked like a kicker on mobile; removed duplicate author caption.

ROUND 2
Seen in one second: Power BI, the named maker, and a clear Studio action.
Idea (one sentence): Renan's portrait sits inside his own introductory sentence; real Studio screens then support the offer.
Live thing: four selectable product screens with an explicit active state and fallback first view.
Layout words by section: hero=sentence / product=large interface and detail crops / about=portrait / resources=reading list / contact=invitation
Scores: design 7.5 · usability 8 · creativity 7 · content 8 → overall 7.6
Caps applied: none on the final inspected home. The product page retains a conventional pricing comparison because the five real plans must remain directly comparable.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Studio opening used a logo instead of the interface (studio desktop-fold): replaced with the existing Data Model Analyzer screen.
2. Product page remains longer and more conventional than the home (studio desktop-page-02): retained full plan and credit information rather than hiding details for visual simplicity.
3. Inline portrait is small on a phone (home mobile-fold): a larger portrait appears in the biography; increasing the inline frame would break the two-line sentence.

Validation and limitations:
- Original home: 14 inspector FAILs. Revised Portuguese and English home: 0 FAILs at 1440, 768 and 390 pixels; one warning for absent footage.
- Revised Studio: 0 FAILs at the same widths before the final substitution of the actual interface image; final inspection is recorded separately with the review artifacts.
- Warning for Studio bare-name heading is defended by the immediately adjacent paragraph specifying the Windows application, Power BI tasks and API/credits usage.
- No-footage warning is intentional: all imagery is first-party and no recorded product clip was available.
- Source skill lint: 0 FAILs; warnings are the existing truthful decade-of-experience statement and a min-height utility (not a full-height hero).
- ESLint and Next production build passed. Browser exercised screenshot switching and mobile menu (10 links, no horizontal overflow). Fourteen principal routes returned HTTP 200. Login inputs remain present; no authenticated checkout, account mutations or contact submissions were performed.
- Motion uses transform/opacity with reduced-motion fallbacks. Existing backend, checkout, authentication and download configuration remain intact.
- Third-party picture/clip credits: none. Bundled stock photography: none. Drawings standing in for photographs: none. Sample business content to replace: none.

Final confirmation: the final Studio build with the Data Model Analyzer opening image was re-inspected at 1440, 768 and 390px: 0 FAIL, 2 defended warnings. Every listed final screenshot for the two home languages and Studio was opened and reviewed. The final Studio visual remains deliberately more conventional than the home because of its existing commercial and installation detail; home score above is a subjective design critique, not an independent rating.
