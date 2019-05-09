create table draftr.ranked_player(
    id serial primary key not null,
    tier_id integer references draftr.tier(id),
    player_id integer references draftr.player(id),
    overall_rank integer not null
)