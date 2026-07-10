import AnimatedSection from '../ui/AnimatedSection'

const content = [
'<section class="destination-content text-left">',

'<h2>Overview</h2>',
'<p>Sri Lanka is one of the world\'s most breathtaking tropical islands, renowned for its golden sandy shoreline, crystal-clear turquoise waters, swaying coconut palms, and breathtaking sunsets. It is an ideal destination for relaxation, adventure, and marine wildlife experiences.</p>',

'<h2>Why Visit Sri Lanka?</h2>',
'<ul>',
'<li>Beautiful tropical beaches</li>',
'<li>World-famous wildlife safaris</li>',
'<li>Excellent surfing conditions</li>',
'<li>Scenic mountain landscapes</li>',
'<li>Rich cultural heritage</li>',
'<li>UNESCO World Heritage Sites</li>',
'<li>Warm tropical atmosphere</li>',
'</ul>',

'<h2>Top Attractions</h2>',
'<ul>',
'<li>Sigiriya Rock Fortress</li>',
'<li>Temple of the Sacred Tooth Relic</li>',
'<li>Mirissa &amp; Unawatuna Beaches</li>',
'<li>Yala &amp; Udawalawe National Parks</li>',
'<li>Ella &amp; Nuwara Eliya</li>',
'<li>Galle Fort</li>',
'<li>Kandy &amp; the Hill Country</li>',
'</ul>',

'<h2>Things to Do</h2>',
'<ul>',
'<li>🐘 Elephant safaris</li>',
'<li>🐋 Whale watching</li>',
'<li>🏄 Surfing</li>',
'<li>🤿 Snorkeling &amp; diving</li>',
'<li>🏊 Swimming</li>',
'<li>🚂 Scenic train rides</li>',
'<li>🏯 Explore ancient ruins</li>',
'<li>🍛 Cooking classes</li>',
'<li>🌅 Sunset photography</li>',
'<li>🚶 Nature walks</li>',
'</ul>',

'<h2>Best Time to Visit</h2>',
'<table>',
'<thead>',
'<tr><th>Season</th><th>Months</th><th>Activities</th></tr>',
'</thead>',
'<tbody>',
'<tr><td>Dry Season</td><td>November – April</td><td>Swimming, whale watching, beach activities</td></tr>',
'<tr><td>Surf Season</td><td>April – October</td><td>Surfing</td></tr>',
'<tr><td>Peak Whale Watching</td><td>December – April</td><td>Blue whales and dolphins</td></tr>',
'</tbody>',
'</table>',

'<h2>Wildlife</h2>',
'<p>Sri Lanka is internationally recognized as one of the best places to see magnificent wildlife in its natural habitat.</p>',
'<ul>',
'<li>Elephants</li>',
'<li>Leopards</li>',
'<li>Blue Whales</li>',
'<li>Sperm Whales</li>',
'<li>Spinner Dolphins</li>',
'<li>Sea Turtles</li>',
'<li>Endemic Birds</li>',
'</ul>',

'</section>',
].join('\n')

export default function AboutSriLanka() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/home/slfleg.png)' }} />
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-teal-950/70 to-slate-900/80" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
      <div className="container-custom relative z-10">
        <AnimatedSection className="max-w-4xl mx-auto">
          <span className="block text-xs font-bold text-teal-400 uppercase tracking-widest mb-8 text-center">
            Pearl of the Indian Ocean
          </span>
          <div
            className="destination-content prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </AnimatedSection>
      </div>
    </section>
  )
}
