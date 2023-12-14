<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title></title>
</head>

<body>

    <h2>Total Farm Per User</h2>
    <table id="total_farm_per_user" style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Name</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Total Farms</b></th>
            </tr>
        </thead>
        <tbody>
            @foreach ($report_generation['total_farm_per_user'] as $total_farm_per_user)
                <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_farm_per_user->name }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_farm_per_user->total_farms }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>


    <h2>List of Farmers by Farm Hectares </h2>
    <table id="farmers_by_farm_hectares" style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Name</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Farm Name</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Farm Hectares</b></th>
            </tr>
        </thead>
        <tbody>
            @foreach ($report_generation['farmers_by_farm_hectares'] as $farmers_by_farm_hectares)
                <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $farmers_by_farm_hectares->name }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $farmers_by_farm_hectares->farm_name }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $farmers_by_farm_hectares->farm_hectares }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>


    
    <h2>Farmers by Farm Location</h2>
    <table id="farmers_by_farm_location_a" style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Name</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Farm Name</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Farm Location</b></th>
            </tr>
        </thead>
        <tbody>
            @foreach ($report_generation['farmers_by_farm_location_a'] as $farmers_by_farm_location_a)
                <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $farmers_by_farm_location_a->name }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $farmers_by_farm_location_a->farm_name }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $farmers_by_farm_location_a->farm_location }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    
    <h2>Products Per Farm</h2>
    <table id="products_per_farm" style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Owner</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Farm Name</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Product Name</b></th>
            </tr>
        </thead>
        <tbody>
            @foreach ($report_generation['products_per_farm'] as $products_per_farm)
                <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $products_per_farm->name }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $products_per_farm->farm_name }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $products_per_farm->product_name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>



    <h2>Total Transaction Per Farm</h2>
    <table id="total_transaction_per_farm" style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Farm Name</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Name</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Total Transactions</b></th>
            </tr>
        </thead>
        <tbody>
            @foreach ($report_generation['total_transaction_per_farm'] as $total_transaction_per_farm)
                <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_transaction_per_farm->farm_name }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_transaction_per_farm->name }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_transaction_per_farm->total_transactions }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    

    <h2>Total Transaction Per Farm</h2>
    <table id="total_transactions_per_buyer" style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Name</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Total Transactions</b></th>
            </tr>
        </thead>
        <tbody>
            @foreach ($report_generation['total_transactions_per_buyer'] as $total_transactions_per_buyer)
                <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_transactions_per_buyer->name }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_transactions_per_buyer->total_transactions }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    
    <h2>Total Transaction Per Farm</h2>
    <table id="total_transactions_per_buyer_per_product" style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Product Name</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Total Transactions</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Total KG Purchased</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Total Price</b></th>
                <th style="border: 1px solid #dddddd; padding: 8px;"><b>Name</b></th>
            </tr>
        </thead>
        <tbody>
            @foreach ($report_generation['total_transactions_per_buyer_per_product'] as $total_transactions_per_buyer_per_product)
                <tr style="border: 1px solid #dddddd; text-align: left; padding: 8px;">
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_transactions_per_buyer_per_product->product_name }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_transactions_per_buyer_per_product->total_transactions }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_transactions_per_buyer_per_product->total_kg_purchased }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_transactions_per_buyer_per_product->total_price }}</td>
                    <td style="border: 1px solid #dddddd; padding: 8px;">{{ $total_transactions_per_buyer_per_product->name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    
</body>

</html>
