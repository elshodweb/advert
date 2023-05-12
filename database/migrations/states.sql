create table history (
  history_id uuid not null default uuid_generate_v4(),
  history_date timestamp default current_timestamp not null,
  history_buy int not null,
  history_sell int not null,
  advert_id uuid not null,
   foreign key (advert_id) 
   references adverts(advert_id) 
   on delete set null
);