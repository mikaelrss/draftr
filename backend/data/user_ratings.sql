create table draftr.user_rating
(
    id      serial primary key             not null,
    rank_id integer references draftr.rank not null,
    user_id varchar                        not null,
    rating  integer                        not null,
    unique (rank_id, user_id),
    CHECK (rating BETWEEN 1 AND 5)
)