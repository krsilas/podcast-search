// Modified parser from 'podcastjs' (https://github.com/justinvos/podcastjs)
import xmlJs from 'xml-js'

export function parsePodcast (text) {
  const podcastRss = xmlJs.xml2js(text, {compact: true});
  const channel = podcastRss.rss.channel

  const podcast = {
    title: parsePodcastTitle(channel),
    description: parsePodcastDescription(channel),
    episodes: podcastRss.rss.channel.item.map(parseEpisode)
  }

  return podcast
}

function formatDate(date){
    return date.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function parsePodcastTitle (channel) {
  if (channel.title) {
    return channel.title._text
  } else {
    throw new Error('Could not parse Podcast.title')
  }
}

export function parsePodcastDate (channel) {
  if (channel.pubDate) {
    return channel.pubDate._text
  } else if (channel.lastBuildDate) {
    return channel.lastBuildDate._text
  } else {
    throw new Error('Could not parse Podcast.date')
  }
}

export function parsePodcastDescription(channel) {
  if (channel.description) {
    return channel.description._text
  } else {
    return ''
  }
}

export function parseEpisode (item, index) {
  const episode = {
    index,
    guid: parseEpisodeGuid (item),
    title: parseEpisodeTitle(item),
    date: formatDate(parseEpisodeDate(item)),
    description: parseEpisodeDescription(item),
    image: parseEpisodeImage(item),
    audio: parseEpisodeAudio(item)
  }
  return episode
}

export function parseEpisodeGuid (item) {
  if (item.guid && item.guid._cdata) {
    return item.guid._cdata
  } else {
    return ''
  }
}

export function parseEpisodeTitle (item) {
  if (item.title) {
    return item.title._text
  } else {
    throw new Error('Could not parse Episode.title')
  }
}

export function parseEpisodeDate(item) {
  if (item.pubDate) {
    return new Date(Date.parse(item.pubDate._text))
  } else {
    return new Date()
  }
}

export function parseEpisodeDescription(item) {
  if (item.description && item.description._cdata) {
    return item.description._cdata
  } else if (item.description) {
    return item.description._text
  } else {
    return ''
  }
}

export function parseEpisodeImage(item) {
  if (item['itunes:image'] && item['itunes:image']._attributes) {
    return item['itunes:image']._attributes.href
  } else {
    return ''
  }
}

export function parseEpisodeAudio(item) {
  if (item.enclosure && item.enclosure._attributes.url) {
    return item.enclosure._attributes.url
  } else {
    throw new Error('Could not parse Episode.audio')
  }
}