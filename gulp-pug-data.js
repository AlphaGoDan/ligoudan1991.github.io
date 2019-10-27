var friends = [
    {
        nameStr: '巴比特',
        orderNum: 0,
        urlStr: 'http://www.8btc.com/',
        weightOpenBool: false,
        pageStr: 'index',
        catalogStr: 'default',
        iconFile: {
            name: '5b0d1558ac502e0062fa3804_cofriendbean_coverfile',
            url:
                'https://lc-tae5x2mv.cn-n1.lcfile.com/ixZ7hVUTRZhylimGRh4oZjDpTAOxzoJHpO23z2Lj',
            mime_type: 'application/octet-stream',
            bucket: null,
            metaData: {
                owner: 'unknown',
                __source: 'external',
                size: 0
            },
            objectId: '5caee18dc05a800073167fdb',
            createdAt: '2019-04-11T06:41:17.685Z',
            updatedAt: '2019-04-11T06:41:17.685Z'
        },
        objectId: '5caee18deaa3750074483c54',
        createdAt: '2019-04-11T06:41:17.876Z',
        updatedAt: '2019-04-11T06:41:17.876Z'
    }
];

var data = {
    index: { test: 44 },
    about: { test: '模版数据成功 333' },
    tpl: { test: '模版数据成功 333' },
    layout: { friends },
    activity: {},
    'activity-detail': {
        citywide: [
            {
                startDate: '',
                indexIdNum: '',
                coverFile: {
                    url: ''
                },
                titleStr: ''
            }
        ]
    },
    baike: {
        cyclopedia: {
            技术百科: [
                {
                    indexIdNum: 1,
                    titleStr: '双重支付'
                }
            ]
        }
    },
    'baike-detail': {
        detail: {
            introStr:
                '双重支付（又称一币多付）是一种数位货币失败模式的构想，即同一个数位token可以被花用两次以上。',
            contentPoi: {
                htmlStr:
                    '<p>双重支付（又称一币多付）是一种数位货币失败模式的构想，即同一个数位token可以被花用两次以上。不像具有实体的符号货币如硬币，电子档案可被复制，所以花用这个行为并不会从原持有者身上移除拥有的状态，也就是”建立”已支付但未移除的货币，加上属于收款者的已支付的同金额货币，或是使收款者凭空多出多重支付的金额，犹如伪钞般，造成通货膨胀而导致货币贬值，从而不再让人信任并愿意持有及流通。防止双重支付需要其他的措施。</p>\n<h3 id="h3-u53D7u4FE1u4EFBu7684u7B2Cu4E09u65B9"><a name="受信任的第三方" class="reference-link"></a><span class="header-link octicon octicon-link"></span>受信任的第三方</h3><p>常由线上受信任的第三方来验证一个数位token是否被花用过，这在信任和资讯安全的角度看都是单点脆弱性。</p>\n<h3 id="h3-u53BBu4E2Du5FC3u5316"><a name="去中心化" class="reference-link"></a><span class="header-link octicon octicon-link"></span>去中心化</h3><p>在2007年，数个分散式的双重支付防范方法被提出。<br>于2009开始运作的加密货币比特币使用了工作证明来避免受信任第三方的需求。交易被记录于公开的区块链上，防止任何人双重支付。\n',
                beReferBool: true,
                objectId: '5caece650237d70068307cc7',
                createdAt: '2019-04-11T05:19:33.925Z',
                updatedAt: '2019-04-11T05:19:33.925Z'
            },
            tagArray: ['双重支付'],
            catalogStr: '技术百科',
            titleStr: '双重支付',
            indexIdNum: 1,
            objectId: '5caece66eaa375007446ff5d',
            createdAt: '2019-04-11T05:19:34.116Z',
            updatedAt: '2019-04-11T05:19:34.116Z'
        },
        correlation: [
            {
                introStr:
                    '双重支付（又称一币多付）是一种数位货币失败模式的构想，即同一个数位token可以被花用两次以上。',
                titleStr: '双重支付',
                indexIdNum: 1
            }
        ]
    },
    coin: {},
    'coin-detail': {},
    domain: {
        len2: [
            {
                moralArray: ['九币'],
                frontStr: '9b',
                backStr: 'com'
            }
        ],
        len3: [
            {
                moralArray: ['九币'],
                frontStr: '9b',
                backStr: 'com'
            }
        ]
    },
    'domain-search': [
        {
            // data:[{
            backStr: 'com',
            moralArray: ['九币'],
            minPriceNum: 100,
            maxPriceNum: 300,
            showLocNum: -1,
            frontStr: '9b',
            objectId: '5caee16fc8959c0073d657ce',
            createdAt: '2019-04-11T06:40:47.612Z',
            updatedAt: '2019-04-11T06:40:47.612Z'
            // }]
        }
    ],
    'domain-item': [
        {
            // data:[{
            backStr: 'com',
            moralArray: ['九币'],
            minPriceNum: 100,
            maxPriceNum: 300,
            showLocNum: -1,
            frontStr: '9b',
            objectId: '5caee16fc8959c0073d657ce',
            createdAt: '2019-04-11T06:40:47.612Z',
            updatedAt: '2019-04-11T06:40:47.612Z'
            // }]
        }
    ],
    exchange: {},
    'exchange-detail': {},
    exponent: {},
    'exponent-detail': {},
    nav: {
        entry: {
            创投机构: [
                {
                    urlStr: '',
                    iconFile: {
                        url: ''
                    },
                    nameStr: '',
                    infoStr: ''
                }
            ]
        }
    },
    news: {},
    'news-detail': {},
    offline: {},
    project: {},
    'project-detail': {}
};

module.exports = { data, friends };
