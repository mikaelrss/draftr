create table draftr.player
(
    id           integer primary key not null,
    position     varchar             not null,
    display_name varchar             not null,
    first_name   varchar             not null,
    last_name    varchar             not null,
    team         varchar             not null,
    bye_week     integer             not null
)