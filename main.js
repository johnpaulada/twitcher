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

const streamerList = [
    {src: 'https://static-cdn.jtvnw.net/jtv_user_pictures/raynday-profile_image-d588caa898a550b9-300x300.jpeg', alt: 'raynday', name: "Raynday", username: '@raynday', active: true, bio: 'eSports Commentator, Streamer, Youtuber and Entertainer for SMITE and PALADINS.', streaming: null},
    {src: 'https://static-cdn.jtvnw.net/jtv_user_pictures/raynday-profile_image-d588caa898a550b9-300x300.jpeg', alt: 'raynday', name: "Raynday", username: '@raynday', active: true, bio: 'eSports Commentator, Streamer, Youtuber and Entertainer for SMITE and PALADINS.', streaming: null}
]

const StreamerList = function(list){
    return {
        $cell: true,
        id: 'streamer-list',
        _list: [],
        $init: function() {
            this._list = list
        },
        $update: function() {
            this.$components = this._list.map(card => StreamerCard(card))
        }
    }
}

var root = StreamerList(streamerList)
