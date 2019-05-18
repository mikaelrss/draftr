create table draftr.ranked_player(
    id serial primary key not null,
    tier_id integer references draftr.tier(id) not null ,
    player_id integer references draftr.player(id) not null ,
    rank_id integer references draftr.rank(id) not null ,
    overall_rank integer not null
)