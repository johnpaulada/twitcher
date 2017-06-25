const STREAMER_LIST = ['freecodecamp', 'raynday']
const ALL = Symbol()
const ONLINE = Symbol()
const OFFLINE = Symbol()
const TABS = {ALL: 'All', ONLINE: 'Online', OFFLINE: 'Offline'}
const USERS_ENDPOINT = 'https://wind-bow.glitch.me/twitch-api/users'
const STREAMS_ENDPOINT = 'https://wind-bow.glitch.me/twitch-api/streams'
const ENDPOINTS = [USERS_ENDPOINT, STREAMS_ENDPOINT]

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
        {$type: 'i', class: `fa fa-circle ${(active ? '' : '-o')}`}
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
    $components: [
        {class: 'card-content', $components: [
            StreamerHeader({name, username, active, src, alt}),
            StreamerInfo({bio, streaming})
        ]}
    ]
})

const StreamerList = function(list) {
    return {
        class: 'container',
        _list: [],
        $init: function() {
            this._list = list
        },
        $update: function() {
            this.$components = this._list.map(card => StreamerCard(card))
        }
    }
}

const Tab = ({name, active}) => ({
  $type: 'li',
  class: active ? 'is-active' : '',
  $components: [
    {$type: 'a', $text: name}
  ]
})

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
          {$type: 'ul', $components: this._filters.map(filter => Tab(filter))}
        ]}
      ]
    }
  }
}

// const streamerList = [
//     {src: 'https://static-cdn.jtvnw.net/jtv_user_pictures/raynday-profile_image-d588caa898a550b9-300x300.jpeg', alt: 'raynday', name: "Raynday", username: '@raynday', active: true, bio: 'eSports Commentator, Streamer, Youtuber and Entertainer for SMITE and PALADINS.', streaming: null}
// ]

const App = function(list) {
  return {
    $cell: true,
    id: 'app',
    class: 'section is-medium',
    _list: [],
    _currentFilter: ALL,
    $init: function() {
      Promise.all(ENDPOINTS.map(endpoint => Promise.all(list.map(user => fetch(`${endpoint}/${user}`).then(res => res.json()))))).then(values => {
        this._list = values[0].reduce((acc, value, i) => {
          acc[i] = {...acc[i], ...value}
          return acc
        }, values[1])

        this.$update()
      })
    },
    $update: function() {
      console.log(this._list);
    }
  }
}

var root = App(STREAMER_LIST)
