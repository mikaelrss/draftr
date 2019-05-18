create table draftr.tier(
    id serial primary key not null,
    rank_id integer references draftr.rank(id),
    uuid varchar not null unique default uuid_generate_v4(),
    tier_order integer not null,
    name varchar
)