create table draftr.rank
(
    id   serial primary key not null,
    uuid varchar            not null unique default uuid_generate_v4(),
    name varchar,
    private boolean not null default false,
    creator varchar not null default 'a girl has no name'
    )
