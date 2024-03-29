function good = CreateOrder_Imbal()

%{

CS: 1/2022 -- quick mod to make my more imbalanced setup

CS: 5/3/19

This program is a modification of CreateOrder_AllShort.  

The goal is to make the order files needed for the MST_Psychopy continuous
version.  I'm too lazy to recode this in Python ;)

Here, we are using a specific mix of trials:
20 target-repeat
44 target-lure
0 extras

ergo 128 trials total

we run lags of 4-30 in here

Revised for a bit longer lags

----- old cruft docs
It sets up a global variable 'order', 
with lags of 0-9 (short lag), 20-80 (medium lag),and 120-180 (long lag)
between 1st and 2nd Repeat or Lure. 
It also sets up a gobal variable 'orderLag', which specifies the lag for a particular trial 
(offset by +500 to distinguish them from 0s for 1sts and foils).

Lags are defined as the number of intervening items between 1st and 2nd position
of a repeat or a lure (e.g., R2 position = 2, then lag = 1 (one intervening item
between R1 and R2).

It first places a predetermined number of 0-lags (here nlags0 = 8), 
then it place the remaining trials involving 2nd R or L lags 2-9


This script will automatically run when you run ExpONSLagBins_0_180.m 

AJ 3/2012

modified 3/21/2012, AJ: fixed bug that added duplicate entries in 'order'

CS 7/10/12
- Cleaned up 0-lag initial placement to prevent failures there
- Cleaned up medium and long-lag initial placement to prevent simple fails
- Checked down to 96 foils and works most of the time.  48 works about 1/3 of the time
- Returning a "good" flag that will let the calling prog know if it worked

CS 12/22/17
- Turned into this short-only version

%}

global order;
global orderLag;
global Offset_1R Offset_2R;
global Offset_1L Offset_2L;
global Offset_Foil;


%rand('state',seed); % reset random seed
%rand('state',sum(100*clock));
%rng('shuffle');

% Code to tell you what type of image it is
Offset_1R = 0; % 1-100 1st of repeat pair
Offset_2R = 100; % 101-200  2nd of repeat pair
Offset_1L = 200; % 201-300 1st of lure pair
Offset_2L = 300; % 301-400 2nd of lure pair
Offset_Foil = 400; % 401+ Foil

nlurepairs = 44;
nreppairs = 20;
nfoils = 0; % May fail some times with this # but works most of the time...
nlag0 = 0; %number of 0-lags for Rs and Ls
min_lag = 4; % For non-zero, what's the min gap?
max_lag = 30; % For non-zero, what's the max gap?

ntrials = 2*(nreppairs + nlurepairs) + nfoils; 

% lag types (1: short; 2: medium; 3 = long)
% 1/2 of the 2nd Rs or Ls are presented after a short lag; 
%1/4 after a medium or long lag.
% lagtype = vertcat([ones(nlurepairs/4,1)*2],[ones(nlurepairs/4,1)*3]);
% lagselectR = randperm(nlurepairs/2); lagpresR = lagtype(lagselectR);
% lagselectL = randperm(nlurepairs/2); lagpresL = lagtype(lagselectL);

% counters
insert_order = randperm(ntrials - 5); % insert_order is for first presentations (last few  can't be first pres.)
repeat_order = randperm(nreppairs); % for 2nd pres Repeats
lure_order = randperm(nlurepairs); % for 2nd pres Lures
foil_order = randperm(nfoils); %
order = zeros(ntrials,1);  % actual array of trial order / types -- start at 0 -- see above for codes
orderLag = zeros(ntrials,1); % array of lags (-1s for 1sts and foils; lags for 2nd presentations).
orderLag = orderLag - 1;

insert_ctr = 1;

good = 1;  % It's all good man...

%% Trial loop for placing Reps and Lures - 0-lags
% for i = 1:nlag0
% 
%     % Place 1st - Repeat
%     insert_pos = 0;
%     while (insert_pos == 0)
%         if (order(insert_order(insert_ctr)) == 0) && (order(insert_order(insert_ctr)+1) == 0) % Make sure this and the next one are open
%             insert_pos = insert_order(insert_ctr);
%         end
%         insert_ctr = insert_ctr + 1;
%     end
%     
%     % Place 2nd - Repeat (0-lag)
%     rnd_pair_place = 1; 
%     pair_pos = 0;
%     for j=1:(length(rnd_pair_place))
%         if ( (insert_pos + rnd_pair_place(j) <= ntrials) && (order(insert_pos + rnd_pair_place(j)) == 0) )
%             pair_pos = insert_pos + rnd_pair_place(j);
%             break;
%         end
%     end
%     
%     if (pair_pos == 0)  
%         fprintf(1,'Failed finding 0 lag R2\n');
%         seed = -1; 
%         good = 0; 
%         return; 
%     end
%     
%     % Stick them into the order array and the orderLag array
%     order(insert_pos) = repeat_order(i) + Offset_1R;
%     order(pair_pos) = repeat_order(i) + Offset_2R;
%     orderLag(pair_pos) = pair_pos - insert_pos - 1 + 500; 
% 
% 
%  % Place 1st - Lure
%     insert_pos = 0;
%     while (insert_pos == 0)
%         if (order(insert_order(insert_ctr)) == 0) && (order(insert_order(insert_ctr)+1) == 0) % Make sure this and the next one are open
%             insert_pos = insert_order(insert_ctr);
%         end
%         insert_ctr = insert_ctr + 1;
%         
%     end
%     
%     % Find position for 2nd - Lure (0-lag)
%     rnd_pair_place = 1; % 0-lag
%     pair_pos = 0;
%     for j=1:(length(rnd_pair_place))
%         if  ( (insert_pos + rnd_pair_place(j) <= ntrials) && (order(insert_pos + rnd_pair_place(j)) == 0) )
%             pair_pos = insert_pos + rnd_pair_place(j);
%             break;
%         end
%     end
%     
%     if (pair_pos == 0)  
%         fprintf(1,'Failed finding 0 lag L2\n');
%         seed = -1; 
%         good = 0; 
%         return; 
%     end
%     
%     % Stick them into the order array and the orderLag array
%     order(insert_pos) = lure_order(i) + Offset_1L;
%     order(pair_pos) = lure_order(i) + Offset_2L;
%     orderLag(pair_pos) = pair_pos - insert_pos - 1 + 500;
% 
% end



%% Trial loop for placing Reps and Lures - non-zero lags

for i = (nlag0+1):(nreppairs)

    % Place 1st - Repeat
    insert_pos = 0;
    while (insert_pos == 0)
        if (order(insert_order(insert_ctr)) == 0) 
            insert_pos = insert_order(insert_ctr);
        end
        insert_ctr = insert_ctr + 1;
    end
    
    % Place 2nd - Repeat (1-9 lag)
    rnd_pair_place = randperm(max_lag - min_lag + 1) + min_lag; 
    pair_pos = 0;
    for j=1:(length(rnd_pair_place))
        if ( (insert_pos + rnd_pair_place(j) <= ntrials) && (order(insert_pos + rnd_pair_place(j)) == 0) )
            pair_pos = insert_pos + rnd_pair_place(j);
            break;
        end
    end
    
    if (pair_pos == 0)  
        fprintf(1,'Failed finding non-zero lag R2\n');
        seed = -1; 
        good = 0; 
        return; 
    end
    
    % Stick them into the order array and the orderLag array
    %fprintf(1,'R %d %d %d\n',insert_pos,pair_pos,i)
    order(insert_pos) = repeat_order(i) + Offset_1R;
    order(pair_pos) = repeat_order(i) + Offset_2R;
    orderLag(pair_pos) = pair_pos - insert_pos - 1 + 500; 

end

for i = (nlag0+1):(nlurepairs)

 % Place 1st - Lure
    insert_pos = 0;
    while (insert_pos == 0)
        if (order(insert_order(insert_ctr)) == 0)
            insert_pos = insert_order(insert_ctr);
        end
        insert_ctr = insert_ctr + 1;
        
    end
    
    % Find position for 2nd - Lure (1-9 lag)
    rnd_pair_place =randperm(max_lag - min_lag + 1) + min_lag; 
    pair_pos = 0;
    for j=1:(length(rnd_pair_place))
        if  ( (insert_pos + rnd_pair_place(j) <= ntrials) && (order(insert_pos + rnd_pair_place(j)) == 0) )
            pair_pos = insert_pos + rnd_pair_place(j);
            break;
        end
    end
    
    if (pair_pos == 0)  
        fprintf(1,'Failed finding non-zero lag L2\n');
        seed = -1; 
        good = 0; 
        return; 
    end
    
    % Stick them into the order array and the orderLag array
    %fprintf(1,'L %d %d %d\n',insert_pos,pair_pos,i)
    order(insert_pos) = lure_order(i) + Offset_1L;
    order(pair_pos) = lure_order(i) + Offset_2L;
    orderLag(pair_pos) = pair_pos - insert_pos - 1 + 500;

end


% %% Trial loop for placing Reps and Lures - medium or long lags
% for i = ((nlurepairs/2)+1):nlurepairs
%     
%     % Place 1st - Repeat
%     insert_pos = 0;
%     med_trial = 0;
%     if (lagpresR(i-(nlurepairs/2)) == 2)
%         med_trial=1;
%     end
%     
%     while (insert_pos == 0)
%         if (order(insert_order(insert_ctr)) == 0)  % It's open
%             if (med_trial == 1) && (insert_order(insert_ctr) < (ntrials-40))  % reasonable shot at finding a mate...
%                 insert_pos = insert_order(insert_ctr);
%             elseif (med_trial == 0) && (insert_order(insert_ctr) < (ntrials-150))  % reasonable shot...
%                 insert_pos = insert_order(insert_ctr);
%             end
%             
%         end
%         insert_ctr = insert_ctr + 1;
%     end
%     
%     % Find position for 2nd - Repeat
%     if lagpresR(i-(nlurepairs/2)) == 2
%         rnd_pair_place = randperm(61)+20; % medium lag 20-80
%     else
%         rnd_pair_place = randperm(61)+120; % long lag 120-220
%     end
%     
%     pair_pos = 0;
%     for j=1:(length(rnd_pair_place))
%         if ( (insert_pos + rnd_pair_place(j) <= ntrials) && (order(insert_pos + rnd_pair_place(j)) == 0) )
%             pair_pos = insert_pos + rnd_pair_place(j);
%             break;
%         end
%     end
%     
%     
%     if (pair_pos == 0)  
%         fprintf(1,'Failed finding longer-lag R2\n');
%         seed = -1; 
%         good = 0; 
%         return; 
%     end
%     
%     % Stick them into the order array
%     order(insert_pos) = repeat_order(i) + Offset_1R;
%     order(pair_pos) = repeat_order(i) + Offset_2R;
%     
%     % Stick them into the orderLag array 
%     orderLag(pair_pos) = pair_pos - insert_pos - 1 + 500; 
%     
%     
%     % Place 1st - Lure
%     insert_pos = 0;
%     med_trial = 0;
%     if lagpresL(i-(nlurepairs/2)) == 2
%         med_trial = 1;
%     end
%     
%     while (insert_pos == 0)
%         if (order(insert_order(insert_ctr)) == 0)
%             if (med_trial == 1) && (insert_order(insert_ctr) < (ntrials-40))  % reasonable shot at finding a mate...
%                 insert_pos = insert_order(insert_ctr);
%             elseif (med_trial == 0) && (insert_order(insert_ctr) < (ntrials-150))  % reasonable shot...
%                 insert_pos = insert_order(insert_ctr);
%             end
% 
%            % insert_pos = insert_order(insert_ctr);
%         end
%         insert_ctr = insert_ctr + 1;
%         
%     end
%     
%     % Find position for 2nd - Lure
%     if lagpresL(i-(nlurepairs/2)) == 2
%         rnd_pair_place = randperm(61)+20; % medium lag 20-80
%     else
%         rnd_pair_place = randperm(61)+120; % long lag 120-220
%     end
%     
%     pair_pos = 0;
%     for j=1:(length(rnd_pair_place))
%         if  ( (insert_pos + rnd_pair_place(j) <= ntrials) && (order(insert_pos + rnd_pair_place(j)) == 0) )
%             pair_pos = insert_pos + rnd_pair_place(j);
%             break;
%         end
%     end
%     
%     if (pair_pos == 0)  
%         fprintf(1,'Failed finding longer-lag L2\n');
%         seed = -1; 
%         good = 0; 
%         return; 
%     end
%     
%     % Stick them into the order array
%     order(insert_pos) = lure_order(i) + Offset_1L;
%     order(pair_pos) = lure_order(i) + Offset_2L;
%     
%     % Stick them into the orderLag array
%     orderLag(pair_pos) = pair_pos - insert_pos - 1 + 500;
%     
% end

%% Now go and fill in the foils
insert_ctr = 1;
for i=1:ntrials
    if (order(i) == 0)
        order(i) = foil_order(insert_ctr) + Offset_Foil;
        insert_ctr = insert_ctr + 1;
    end
end


% saveorder = sprintf('s%d_order.mat',seed);
% save(saveorder, 'order','orderLag');
% 
% %% Now, read the actual stimuli used in each set
% Set1 = dlmread('Set1.txt');
% Set2 = dlmread('Set2.txt');
% 
% saveorder = sprintf('s%d_order.mat',seed);
% save(saveorder, 'order','orderLag', 'Offset_1R', 'Offset_2R', 'Offset_1L', 'Offset_2L', 'Offset_Foil', 'Set1', 'Set2');
% 

