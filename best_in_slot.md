---
layout: resources
title: Best in Slot
---


<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  {% for node in site.data.specs %}
  <div class="panel panel-default">
    <div class="panel-heading clickable" role="tab button" data-toggle="collapse" data-parent="#accordion" href="#collapse{{ node.spec }}" id="heading{{ node.spec }}" aria-expanded="true" aria-controls="collapse{{ node.spec }}">
      <img src="/img/{{ node.spec }}_{{ node.class }}.png" width="30px" height="30px"></img>
      <h4 class="panel-title pull-right">
        <p class="vcenter">{{ node.spec }} {{ node.class }}</p>
      </h4>
    </div>
    <div id="collapse{{ node.spec }}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading{{ node.spec }}">
      <table class="table">
        <tbody>
          {% for item in node.items %}
          <tr>
            <td>{{ item.slot }}</td>
            <td><a href="{{ item.url }}">[{{ item.item_name }}]</a></td>
          </tr>
          {% endfor %}
        </tbody>
      </table>
    </div>
  </div>
  {% endfor %}
</div>
