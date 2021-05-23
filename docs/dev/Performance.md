# Performance

Wiki3 scores 100/100/100 on chrome's lighthouse.

Test against https://mustafahi.github.io/Wiki3/

### Version 0.4 break-down

Those tests were run with default options, (some options will give better results).

- webpagetest.org | Virginia, USA

    https://www.webpagetest.org/result/210522_AiDcCP_64b0bf3d5d2ba9974029a987d4bf7284/

    ![benchmark](https://www.webpagetest.org/waterfall.php?test=210522_AiDcCP_64b0bf3d5d2ba9974029a987d4bf7284&run=1&cached=&step=1)

    ![cross-domain requests](https://www.webpagetest.org/waterfall.png?test=210522_AiDcCP_64b0bf3d5d2ba9974029a987d4bf7284&run=1&width=930&type=connection&mime=1)

    While this is very fast ~500ms total load time, there is a room for improvement,
    
    1. Cross-domain requests to `cdn.jsdelivr.net` having to do DNS lookup, initial connect and SSL negotiation 30/30/44 ms
      can be solved by placing the libraries in the same folder(domain) as the `index.html` (that is up to you to do it).

    2. According to the website, GitHub has only 10 minutes cache time, so I will keep heavy libraries stored in CDN (~6 days cache).

    3. There is 32ms CPU time for `Wiki.js`, while it's 3-5 ms for other JS files, I need to study why and see if it can be improved.


- gtmetrix.com | Vancouver, Canada

    https://gtmetrix.com/reports/mustafahi.github.io/9L346y57/

    ![result](https://user-images.githubusercontent.com/5108884/119243926-fc180d80-bb73-11eb-996e-d4fc90fc6432.png)

    144ms Fully loaded, nothing much to say.

