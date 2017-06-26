const STREAMER_LIST = ['freecodecamp', 'raynday', 'jepedesu', 'overwatchcontenders', 'brunofin', "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
const ALL = 'ALL'
const ONLINE = 'ONLINE'
const OFFLINE = 'OFFLINE'
const TABS = {ALL: 'All', ONLINE: 'Online', OFFLINE: 'Offline'}
const TAB_DECISIONS = { ALL: [true, true], ONLINE: [true, false], OFFLINE: [false, true] }
const TWITCH_URL = 'https://www.twitch.tv'
const USERS_ENDPOINT = 'https://wind-bow.glitch.me/twitch-api/users'
const STREAMS_ENDPOINT = 'https://wind-bow.glitch.me/twitch-api/streams'
const ENDPOINTS = [USERS_ENDPOINT, STREAMS_ENDPOINT]
const DEFAULT_AVATAR = 'https://s3-us-west-2.amazonaws.com/web-design-ext-production/p/Glitch_474x356.png'

const StreamerName = ({name}) => ({
   $type: 'p',
   $text: name,
   class: 'title is-4'
})

const StatusIcon = ({active}) => ({
    $type: 'span',
    class: 'icon is-small',
    style: active ? 'color: green' : '',
    $components: [
        {$type: 'i', class: `fa fa-circle${(active ? '' : '-o')}`}
    ]
})

const StreamerUsername = ({username, active}) => ({
    $type: 'p',
    class: 'subtitle is-6',
    $components: [
        {$text: `${username} `, $type: 'span'},
        StatusIcon({active})
    ]
})

const StreamerCardTitle = ({name, username, active}) => ({
    class: 'media-content',
    $components: [StreamerName({name}), StreamerUsername({username, active})]
})

const StreamingTitle = ({streaming}) => ({
    $type: 'p',
    $components: [
        {$type: 'strong', $text: streaming || ''}
    ]
})

const StreamerBio = ({bio}) => ({
    $type: 'p',
    $components: [
        {$type: 'em', $text: bio || ''}
    ]
})

const StreamerInfo = ({bio, streaming}) => ({
    class: 'content',
    $components: [
        StreamerBio({bio}),
        StreamingTitle({streaming})
    ]
})

const StreamerAvatar = ({src, alt}) => ({
    class: 'media-left',
    $components: [
        {$type: 'figure', class: 'image is-48x48', $components: [
            {$type: 'img', src, alt}
        ]}
    ]
})

const StreamerHeader = ({name, username, active, src, alt}) => ({
    class: 'media',
    $components: [
        StreamerAvatar({src, alt}),
        StreamerCardTitle({name, username, active})
    ]
})

const StreamerCard = ({name, username, active, src, alt, bio, streaming}) => ({
    class: 'card',
    style: 'cursor: pointer',
    onclick: () => {window.location.href = `${TWITCH_URL}/${username}`},
    $components: [
        {class: 'card-content', $components: [
            StreamerHeader({name, username, active, src, alt}),
            StreamerInfo({bio, streaming})
        ]}
    ]
})

const StreamerList = function() {
    return {
        class: 'container',
        $init: function() {
            this.$components = this._list.map(card => StreamerCard(card))
        }
    }
}

const Tab = function({name, active}) {
  return {
    $type: 'li',
    class: active ? 'is-active' : '',
    onclick: function() {
      this._currentFilter = name.toUpperCase()
    },
    $components: [
      {$type: 'a', $text: name}
    ]
  }
}

const TabList = function(tabs) {
  return {
    class: 'container',
    _filters: [],
    $init: function() {
      this._filters = tabs
    },
    $update: function() {
      this.$components = [
        {class: 'tabs is-centered is-boxed', $components: [
          {$type: 'ul', $components: Object.entries(this._filters).map(filter => Tab({name: filter[1], active: this._currentFilter === filter[0]}))}
        ]}
      ]
    }
  }
}

const zip = (a, b) => {
    let zipped = []
    a.forEach((v, i) => zipped.push(Object.assign({}, v, b[i])))

    return zipped
}

const getCardData = data => {
  console.log(data);
  if (data.status === 404) {
    const name = data.message.replace('User "', '').replace('" was not found', '');

    return {src: DEFAULT_AVATAR, alt: name, name, username: `@${name}`, active: false, bio: `${data.message}.`, streaming: null}
  }

  return {src: data.logo || DEFAULT_AVATAR, alt: data.name, name: data.display_name, username: `@${data.name}`, active: !!data.stream, bio: data.bio, streaming: !!data.stream ? data.stream.channel.status : null}
}

const App = function(list) {
  return {
    $cell: true,
    id: 'app',
    class: 'section is-medium',
    _fullList: [],
    _list: [],
    _searchFilter: '',
    _currentFilter: ALL,
    _refresh: function() {
      Promise.all(ENDPOINTS.map(endpoint => Promise.all(list.map(user => fetch(`${endpoint}/${user}`).then(res => res.json()))))).then(values => {
        this._fullList = zip(values[0], values[1]).map(getCardData)
        this.$update()
      })
    },
    $init: function() {
      this._refresh()
    },
    $update: function() {
      this._list = this._fullList.filter(v => v.alt.includes(this._searchFilter) && TAB_DECISIONS[this._currentFilter][(v.streaming === null) & 1])
      this.$components = [TabList(TABS), StreamerList()]
    }
  }
}

var root = App(STREAMER_LIST)
