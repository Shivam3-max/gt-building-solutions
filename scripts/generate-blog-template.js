// Regenerates content/blog-posts.xlsx from scratch: a "Posts" sheet with the
// column headers plus two fully-written example rows, and an "Instructions"
// sheet documenting every column. Run with: node scripts/generate-blog-template.js
// Only run this if you want to reset the template — it overwrites the file,
// so don't run it after you've already added your own real posts to it.
const path = require('path');
const ExcelJS = require('exceljs');

const OUT_PATH = path.join(__dirname, '..', 'content', 'blog-posts.xlsx');

const HEADERS = [
  'status', 'slug', 'title', 'meta_title', 'meta_description', 'excerpt',
  'category', 'related_category_slug', 'related_brand_slug', 'author',
  'published_date', 'updated_date', 'featured_image', 'body_markdown',
  'faq1_question', 'faq1_answer', 'faq2_question', 'faq2_answer',
  'faq3_question', 'faq3_answer', 'faq4_question', 'faq4_answer',
  'faq5_question', 'faq5_answer', 'tags',
];

const POST_1 = {
  status: 'published',
  slug: 'cpvc-vs-gi-pipes-panchkula',
  title: 'CPVC vs GI Pipes: Which Should You Choose in Panchkula?',
  meta_title: 'CPVC vs GI Pipes: Which to Choose?',
  meta_description: 'CPVC or GI pipes for your Panchkula home? We compare corrosion resistance, cost, and lifespan to help you pick the right plumbing.',
  excerpt: 'GI pipes were the default for decades, but most new construction in Panchkula and Chandigarh now specifies CPVC. Here is why — and when GI still makes sense.',
  category: 'Pipes & Plumbing',
  related_category_slug: 'pipes-plumbing',
  related_brand_slug: 'prince-piping',
  author: 'GT Building Solutions Team',
  published_date: '2026-06-10',
  updated_date: '2026-06-10',
  featured_image: '',
  body_markdown: `If you're planning concealed water supply lines for a new home or a full renovation, you'll almost certainly be choosing between CPVC and GI (galvanized iron) pipes. Both do the same basic job, but they behave very differently over a 15-20 year lifespan — and once pipes are sealed inside a wall, replacing them is expensive and disruptive.

## Why CPVC has become the default

CPVC (Chlorinated Polyvinyl Chloride) doesn't corrode or scale on the inside the way GI does. Over years of use, GI pipes gradually narrow as mineral deposits and rust build up on the interior wall, reducing water pressure and eventually causing leaks at the joints. CPVC's smooth interior stays consistent for the life of the pipe, which is why most plumbing contractors in Panchkula and Chandigarh now specify it by default for new concealed lines.

CPVC is also a better match for hot water lines — it's rated for sustained higher temperatures without the metallic taste or discoloration that ageing GI pipes can introduce into hot water.

## Where GI still makes sense

GI pipes aren't obsolete. They're still specified for exposed outdoor lines where UV resistance and physical impact resistance matter more than long-term scaling, and for some industrial or high-pressure applications. If you're extending an existing GI system rather than replacing it, matching materials can also simplify the fitting work.

## What we stock

GT Building Solutions carries Prince Piping's CPVC range for hot and cold water supply lines, alongside uPVC for drainage and Tata Agrico's piping for agricultural and irrigation use. Our team can help you work out the right pipe diameters and fitting counts for your specific layout before you commit to a full order — bring your rough plumbing drawing or a room-by-room list and we'll help you scope it.`,
  faq1_question: 'Is CPVC safe for drinking water?',
  faq1_answer: 'Yes. CPVC is approved for potable water supply and is the standard choice for concealed hot and cold water lines in Indian residential construction.',
  faq2_question: 'Can I mix CPVC and GI pipes in the same system?',
  faq2_answer: 'You can transition between them using the correct threaded adapter fittings, but it is best to keep new concealed runs entirely in one material to avoid mismatched joints becoming a future leak point.',
  faq3_question: 'Does GT Building Solutions stock CPVC pipes in Panchkula?',
  faq3_answer: 'Yes, we stock Prince Piping CPVC pipes and fittings in common diameters at our Panchkula showroom, along with uPVC drainage pipes and plumbing accessories.',
  faq4_question: '',
  faq4_answer: '',
  faq5_question: '',
  faq5_answer: '',
  tags: 'CPVC, GI pipes, plumbing, Prince Piping',
};

const POST_2 = {
  status: 'published',
  slug: 'choosing-tile-adhesive-vitrified-tiles',
  title: 'How to Choose the Right Tile Adhesive for Vitrified Tiles',
  meta_title: 'Choosing Tile Adhesive for Vitrified Tiles',
  meta_description: 'Vitrified tiles need a different adhesive than ceramic. Here is how to pick the right grade so your floor does not hollow-sound or lift later.',
  excerpt: 'Vitrified tiles have low water absorption, which means the wrong adhesive can fail months after installation. Here is what actually matters when choosing one.',
  category: 'Adhesives & Surface Solutions',
  related_category_slug: 'adhesives',
  related_brand_slug: 'roff',
  author: 'GT Building Solutions Team',
  published_date: '2026-06-24',
  updated_date: '2026-06-24',
  featured_image: '',
  body_markdown: `Large-format vitrified tiles look excellent when installed correctly — and hollow-sound or lift at the edges within a year when they're not. The single biggest cause is using a standard, low-grade adhesive that was never designed for a tile with such low water absorption.

## Why vitrified tiles are different from ceramic

Ceramic tiles absorb some moisture from the adhesive as it cures, which helps form a mechanical bond. Vitrified tiles absorb almost none of it, so the adhesive has to chemically bond to a much less porous surface. A cement-based adhesive formulated for ceramic tiling often doesn't have the polymer content needed to grip a vitrified tile properly, especially on large-format pieces (600x600mm and above) where any weak spot has more leverage to lift.

## What to check before you buy

Look for an adhesive specifically labelled for vitrified or large-format tiles — these have a higher polymer-modified cement content for stronger chemical adhesion. For outdoor or wet-area vitrified tiling (terraces, bathroom floors), also confirm the adhesive is rated for those conditions, since temperature swings and standing water put extra stress on the bond.

Trowel notch size matters too: large-format tiles need full back-buttering and a larger notch trowel than a small ceramic wall tile would, so you get full contact coverage rather than isolated adhesive dabs that leave hollow pockets.

## What we stock

GT Building Solutions carries Roff's vitrified and large-format tile adhesives alongside Fevicol and Pidilite's general-purpose ranges, so our team can match the adhesive to your specific tile size and application rather than defaulting to whatever is cheapest. If you're tiling with Kajaria vitrified tiles from our Chandigarh showroom, ask us for the matching adhesive grade at the same time — it saves a second trip.`,
  faq1_question: 'Can I use ceramic tile adhesive for vitrified tiles?',
  faq1_answer: 'It is not recommended. Standard ceramic adhesives typically lack the polymer content needed to bond to a vitrified tile’s low-absorption surface, which can lead to hollow spots or lifting over time.',
  faq2_question: 'Do large-format tiles need a different trowel?',
  faq2_answer: 'Yes. Large-format vitrified tiles (600x600mm and above) need full back-buttering and a larger notch trowel to achieve full adhesive contact and avoid hollow pockets under the tile.',
  faq3_question: 'What tile adhesive brands does GT Building Solutions stock?',
  faq3_answer: 'We stock Roff, Fevicol, and Pidilite tile adhesives, covering general-purpose ceramic tiling through to vitrified and large-format tile applications.',
  faq4_question: '',
  faq4_answer: '',
  faq5_question: '',
  faq5_answer: '',
  tags: 'tile adhesive, vitrified tiles, Roff, Kajaria',
};

const INSTRUCTIONS = [
  ['Column', 'Required?', 'What goes here'],
  ['status', 'No', '"published" or "draft". Leave blank for published. Draft rows are skipped when the site is built.'],
  ['slug', 'No', 'URL slug, e.g. "cpvc-vs-gi-pipes-panchkula". Leave blank and one will be generated from the title.'],
  ['title', 'Yes', 'The post title / page heading.'],
  ['meta_title', 'No', 'Shorter title for Google search results (aim for under 60 characters). Falls back to the title if left blank.'],
  ['meta_description', 'Yes', 'The description shown under the title in Google search results. Aim for under 155 characters.'],
  ['excerpt', 'Yes', 'A 1-2 sentence summary shown on the blog listing page.'],
  ['category', 'No', 'One of: Kitchen, Furniture & Door Hardware / Adhesives & Surface Solutions / Panels & Gypsum Boards / Tiles & Sanitary / Paints & Coatings / Power Tools & Equipment / Pipes & Plumbing. Used for display only.'],
  ['related_category_slug', 'No', 'Links this post to a category page. Must be one of: hardware, adhesives, panels, tiles, paints, power-tools, pipes-plumbing.'],
  ['related_brand_slug', 'No', 'Links this post to a brand page, e.g. "kajaria", "prince-piping", "roff". Must match a brand already on the site.'],
  ['author', 'No', 'Defaults to "GT Building Solutions Team" if left blank.'],
  ['published_date', 'Yes', 'Format: YYYY-MM-DD, e.g. 2026-06-10'],
  ['updated_date', 'No', 'Format: YYYY-MM-DD. Defaults to published_date. Update this whenever you edit an existing post.'],
  ['featured_image', 'No', 'A filename only, e.g. "my-photo.jpg" — the actual image file must be placed in public/Public/blog/. Leave blank to automatically use the related category’s existing photo instead.'],
  ['body_markdown', 'Yes', 'The article body. Supports Markdown — see the cheat sheet below.'],
  ['faq1_question ... faq5_question', 'No', 'Up to 5 optional FAQ questions for this post.'],
  ['faq1_answer ... faq5_answer', 'No', 'The matching answer for each FAQ question above. A question with no answer (or vice versa) is ignored.'],
  ['tags', 'No', 'Comma-separated keywords. Not shown publicly yet, reserved for future use.'],
  [],
  ['Markdown cheat sheet (used in body_markdown)', '', ''],
  ['## Subheading', '', 'Creates a section heading (use for every major topic shift — this is what helps Google understand the structure of the article).'],
  ['### Smaller subheading', '', 'Creates a smaller heading, nested under a ## heading.'],
  ['**bold text**', '', 'Makes text bold.'],
  ['- item one\n- item two', '', 'Creates a bullet list (each item on its own line starting with "- ").'],
  ['[link text](https://example.com)', '', 'Creates a hyperlink.'],
  ['Blank line between paragraphs', '', 'Starts a new paragraph. Text on consecutive lines with no blank line between them is treated as one paragraph.'],
];

function addPostRow(sheet, post) {
  sheet.addRow(HEADERS.map((h) => post[h] ?? ''));
}

async function run() {
  const workbook = new ExcelJS.Workbook();

  const postsSheet = workbook.addWorksheet('Posts');
  postsSheet.addRow(HEADERS);
  postsSheet.getRow(1).font = { bold: true };
  postsSheet.columns = HEADERS.map((h) => ({ width: h === 'body_markdown' ? 60 : 22 }));
  addPostRow(postsSheet, POST_1);
  addPostRow(postsSheet, POST_2);

  const instructionsSheet = workbook.addWorksheet('Instructions');
  instructionsSheet.columns = [{ width: 34 }, { width: 12 }, { width: 90 }];
  INSTRUCTIONS.forEach((row, i) => {
    const r = instructionsSheet.addRow(row);
    if (i === 0 || row[0]?.startsWith('Markdown cheat sheet')) r.font = { bold: true };
  });
  instructionsSheet.getColumn(3).alignment = { wrapText: true, vertical: 'top' };

  await workbook.xlsx.writeFile(OUT_PATH);
  console.log(`Wrote ${OUT_PATH}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
