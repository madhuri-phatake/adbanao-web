var allbuttons = "";
            var cards = "";
            fetch(`${node_url}/api/get_faqs`)
                .then(response => response.json())
                .then(data => {
                    let datalength = data.data.length;
                    let datares = data.data;
                    datares.forEach((item, e) => {
                        const stringData = encodeURIComponent(JSON.stringify(item.faqs));                      
                        allbuttons += `<div id="catDiv" class='' style="white-space:nowrap;margin-bottom:12px;" onclick="getfaqs('${encodeURIComponent(JSON.stringify(item.faqs))}')">
                    <a href="#" class="bg-warning py-2 px-3 rounded-pill" style="color:black;text-decoration:none;">${item.faq_category_name}</a>
                                </div>`;
                        document.getElementById('buttons').innerHTML = allbuttons;
                    })
                    $("#catDiv").click();
                });
            function getfaqs(data) {
                const accordionContainer = document.querySelector('.accordion-container');
                accordionContainer.innerHTML = '';
                var faqs_data = JSON.parse(decodeURIComponent(data));
                const accordion = document.createElement('ul');
                accordion.classList.add('accordion');
                faqs_data.forEach((item, i) => {
                    const li = document.createElement('li');
                    li.setAttribute('class', 'myid1');
                    const list = document.getElementsByTagName('li');                    
                    const header = document.createElement('div');
                    const content = document.createElement('div');
                    content.setAttribute('class', 'democlass')
                    header.innerHTML = item.question;
                    content.innerHTML = item.answer;
                    header.addEventListener('click', () => {
                        content.classList.toggle('show');
                    });
                    li.appendChild(header);
                    li.appendChild(content);
                    accordion.appendChild(li);
                });
                accordionContainer.appendChild(accordion);
                var collapse_container=document.querySelectorAll('.myid1');
                collapse_container.forEach(function (collapsible) {
                    var header = collapsible.querySelector('.myid1 div');
                    var body = collapsible.querySelector('.democlass');
                    header.addEventListener('click', function () {
                        // body.classList.toggle('collapsed');
                        header.classList.toggle('collapsed');
                    });
               })
            }