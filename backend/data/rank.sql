create table draftr.rank
(
    id   serial primary key not null,
    uuid varchar            not null unique default uuid_generate_v4(),
    name varchar
)