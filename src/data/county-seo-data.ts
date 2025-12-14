
export interface CountySEOData {
    name: string;
    cities: string[];
    climateText: string;
}

export const COUNTY_SEO_DATA: Record<string, CountySEOData> = {
    'blekinge-lan': {
        name: 'Blekinge län',
        cities: ['Karlskrona', 'Karlshamn', 'Ronneby', 'Sölvesborg', 'Olofström'],
        climateText: 'kustnära klimat och salta vindar'
    },
    'dalarnas-lan': {
        name: 'Dalarnas län',
        cities: ['Falun', 'Borlänge', 'Avesta', 'Ludvika', 'Mora'],
        climateText: 'inlandsklimat och kalla vintrar'
    },
    'gotlands-lan': {
        name: 'Gotlands län',
        cities: ['Visby', 'Hemse', 'Slite', 'Klintehamn', 'Roma'],
        climateText: 'kalkstensrika miljö och maritima klimat'
    },
    'gavleborgs-lan': {
        name: 'Gävleborgs län',
        cities: ['Gävle', 'Sandviken', 'Hudiksvall', 'Bollnäs', 'Söderhamn'],
        climateText: 'kustlandskap och snörika vintrar'
    },
    'hallands-lan': {
        name: 'Hallands län',
        cities: ['Halmstad', 'Varberg', 'Falkenberg', 'Kungsbacka', 'Laholm'],
        climateText: 'västkustklimat med mycket vind och fukt'
    },
    'jamtlands-lan': {
        name: 'Jämtlands län',
        cities: ['Östersund', 'Åre', 'Krokom', 'Strömsund', 'Brunflo'],
        climateText: 'fjällvärldens utmanande väderförhållanden'
    },
    'jonkopings-lan': {
        name: 'Jönköpings län',
        cities: ['Jönköping', 'Huskvarna', 'Nässjö', 'Värnamo', 'Vetlanda'],
        climateText: 'småländska höglandets varierande väder'
    },
    'kalmar-lan': {
        name: 'Kalmar län',
        cities: ['Kalmar', 'Västervik', 'Oskarshamn', 'Nybro', 'Vimmerby'],
        climateText: 'Östersjökustens specifika förhållanden'
    },
    'kronobergs-lan': {
        name: 'Kronobergs län',
        cities: ['Växjö', 'Alvesta', 'Ljungby', 'Älmhult', 'Markaryd'],
        climateText: 'det småländska inlandets skogsklimat'
    },
    'norrbottens-lan': {
        name: 'Norrbottens län',
        cities: ['Luleå', 'Boden', 'Piteå', 'Kiruna', 'Gällivare'],
        climateText: 'det arktiska klimatet och midnattssolen'
    },
    'skane-lan': {
        name: 'Skåne län',
        cities: ['Malmö', 'Helsingborg', 'Lund', 'Kristianstad', 'Landskrona'],
        climateText: 'det sydliga, milda men blåsiga klimatet'
    },
    'stockholms-lan': {
        name: 'Stockholms län',
        cities: ['Stockholm', 'Solna', 'Södertälje', 'Upplands Väsby', 'Täby'],
        climateText: 'skärgårdsmiljö och storstadspuls'
    },
    'sodermanlands-lan': {
        name: 'Södermanlands län',
        cities: ['Nyköping', 'Eskilstuna', 'Strängnäs', 'Katrineholm', 'Flen'],
        climateText: 'det sörmländska herrgårdslandskapets förutsättningar'
    },
    'uppsala-lan': {
        name: 'Uppsala län',
        cities: ['Uppsala', 'Enköping', 'Knivsta', 'Bålsta', 'Tierp'],
        climateText: 'Upplands öppna landskap'
    },
    'varmlands-lan': {
        name: 'Värmlands län',
        cities: ['Karlstad', 'Kristinehamn', 'Arvika', 'Filipstad', 'Säffle'],
        climateText: 'Vänerkustens och skogarnas klimat'
    },
    'vasterbottens-lan': {
        name: 'Västerbottens län',
        cities: ['Umeå', 'Skellefteå', 'Lycksele', 'Vindeln', 'Vännäs'],
        climateText: 'det norrländska kustlandskapet'
    },
    'vasternorrlands-lan': {
        name: 'Västernorrlands län',
        cities: ['Sundsvall', 'Härnösand', 'Örnsköldsvik', 'Timrå', 'Sollefteå'],
        climateText: 'Höga Kustens dramatiska natur'
    },
    'vastmanlands-lan': {
        name: 'Västmanlands län',
        cities: ['Västerås', 'Köping', 'Arboga', 'Fagersta', 'Sala'],
        climateText: 'Mälardalens specifika klimat'
    },
    'vastra-gotalands-lan': {
        name: 'Västra Götalands län',
        cities: ['Göteborg', 'Borås', 'Trollhättan', 'Skövde', 'Uddevalla'],
        climateText: 'det omväxlande västsvenska klimatet'
    },
    'orebro-lan': {
        name: 'Örebro län',
        cities: ['Örebro', 'Kumla', 'Lindesberg', 'Karlskoga', 'Hallsberg'],
        climateText: 'Bergslagens och slättlandets förutsättningar'
    },
    'ostergotlands-lan': {
        name: 'Östergötlands län',
        cities: ['Linköping', 'Norrköping', 'Motala', 'Finspång', 'Mjölby'],
        climateText: 'det östgötska slättlandskapet'
    }
};
