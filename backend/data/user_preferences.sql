create table draftr.user_preference(
    id serial primary key not null,
    user_id varchar not null unique,
    rank_id integer references draftr.rank(id)
)